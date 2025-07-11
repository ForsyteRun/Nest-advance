import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateTaskDto {
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
