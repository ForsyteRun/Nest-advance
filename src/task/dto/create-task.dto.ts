import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 10)
  title: string;

  @IsInt()
  @IsNotEmpty()
  note: number;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}
