import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterRequest {
  @ApiProperty({
    description: 'user email for login',
    example: '1M5YI@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'user email for login',
    example: '12345',
    minLength: 3,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  password: string;

  @ApiProperty({
    description: 'user email for login',
    example: 'Ivan',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}
