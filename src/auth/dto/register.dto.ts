import { IsEmail, IsString, Min } from 'class-validator';

export class RegisterRequest {
  @IsEmail()
  email: string;

  @IsString()
  @Min(3)
  password: string;

  @IsString()
  name: string;
}
