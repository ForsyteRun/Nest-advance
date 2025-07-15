import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateExecutorDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 10)
  name: string;
}
