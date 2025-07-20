import { Injectable, ConflictException } from '@nestjs/common';
import { RegisterRequest } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prismaServece: PrismaService) {}

  async register(dto: RegisterRequest) {
    const isUserExist = await this.prismaServece.user.findUnique({
      where: { email: dto.email },
    });

    if (isUserExist) {
      throw new ConflictException('User already exists');
    }

    const user = await this.prismaServece.user.create({ data: dto });

    return user;
  }
}
