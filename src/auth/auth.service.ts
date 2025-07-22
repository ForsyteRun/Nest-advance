import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginRequest } from './dto/login.dto';
import { RegisterRequest } from './dto/register.dto';
import { JwtPayload } from './interfaces/jwt.interface';

@Injectable()
export class AuthService {
  JWT_SECRET: string;
  JWT_ACCESS_TTL: string;
  JWT_REFRESH_TTL: string;
  constructor(
    private readonly prismaServece: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_SECRET = this.configService.getOrThrow<string>('JWT_SECRET');
    this.JWT_ACCESS_TTL =
      this.configService.getOrThrow<string>('JWT_ACCESS_TTL');
    this.JWT_REFRESH_TTL =
      this.configService.getOrThrow<string>('JWT_REFRESH_TTL');
  }

  async register(dto: RegisterRequest) {
    const { email, password, name } = dto;

    const isUserExist = await this.prismaServece.user.findUnique({
      where: { email },
    });

    if (isUserExist) {
      throw new ConflictException('User already exists');
    }

    const passHash = await hash(password);

    const user = await this.prismaServece.user.create({
      data: { email, password: passHash, name },
    });

    return this.generateTokens(user.id);
  }

  async login(dto: LoginRequest) {
    const { email, password } = dto;

    const isUserExist = await this.prismaServece.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
      },
    });

    if (!isUserExist) {
      throw new NotFoundException('User not exists');
    }

    const isValidPassword = await verify(isUserExist.password, password);

    if (!isValidPassword) {
      throw new NotFoundException('User not exists');
    }

    return this.generateTokens(isUserExist.id);
  }

  private generateTokens(id: string) {
    const payload: JwtPayload = { id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TTL,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TTL,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
