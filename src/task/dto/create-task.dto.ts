import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 10)
  name: string;
}