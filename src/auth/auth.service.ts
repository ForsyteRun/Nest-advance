import { Injectable, ConflictException } from '@nestjs/common';
import { RegisterRequest } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly prismaServece: PrismaService) {}

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

    return user;
  }
}
