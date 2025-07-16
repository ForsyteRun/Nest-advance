import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  IsOptional,
  Length,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { CreateExecutorDto } from 'src/executor/dto/create-executor.dto';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 10)
  title: string;

  @IsInt()
  @IsNotEmpty()
  note: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExecutorDto)
  executors: CreateExecutorDto[];

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @IsOptional()
  @IsString()
  poster: string;
}
