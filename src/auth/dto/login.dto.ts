import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginRequest {
  @ApiProperty({
    description: 'user email for login',
    example: '1M5YI@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'user password for login',
    example: '122345',
    minLength: 3,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  password: string;
}
