import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginRequest } from './dto/login.dto';
import { RegisterRequest } from './dto/register.dto';
import type { JwtPayload } from './interfaces/jwt.interface';
import type { Response, Request } from 'express';
import { isDev } from 'utils/is-dev.utils';

@Injectable()
export class AuthService {
  JWT_ACCESS_TTL: string;
  JWT_REFRESH_TTL: string;
  COOKIE_DOMAIN: string;
  constructor(
    private readonly prismaServece: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_ACCESS_TTL = configService.getOrThrow<string>('JWT_ACCESS_TTL');
    this.JWT_REFRESH_TTL = configService.getOrThrow<string>('JWT_REFRESH_TTL');
    this.COOKIE_DOMAIN = configService.getOrThrow<string>('COOKIE_DOMAIN');
  }

  async register(res: Response, dto: RegisterRequest) {
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

    return this.auth(res, user.id);
  }

  async login(res: Response, dto: LoginRequest) {
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

    return this.auth(res, isUserExist.id);
  }

  async logout(res: Response) {
    this.setCookie(res, '', new Date(0));
    return true;
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const payload: JwtPayload = await this.jwtService.verifyAsync(refreshToken);

    if (payload) {
      const user = await this.prismaServece.user.findUnique({
        where: { id: payload.id },
        select: {
          id: true,
        },
      });

      if (!user) {
        return new NotFoundException('User not found');
      }

      return this.auth(res, user.id);
    }
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

  private setCookie(res: Response, token: string, expire: Date) {
    res.cookie('refreshToken', token, {
      httpOnly: true,
      domain: this.COOKIE_DOMAIN,
      expires: expire,
      secure: !isDev(this.configService),
      sameSite: isDev(this.configService) ? 'none' : 'lax',
    });
  }

  private auth(res: Response, id: string) {
    const { accessToken, refreshToken } = this.generateTokens(id);
    this.setCookie(res, refreshToken, new Date(Date.now() + 60 * 60 * 24 * 7));

    return { accessToken };
  }
}
