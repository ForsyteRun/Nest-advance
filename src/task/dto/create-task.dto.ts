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
import { ExecutorEntity } from 'src/executor/entities/executor.entity';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 10)
  title: string;

  @IsInt()
  @IsNotEmpty()
  note: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExecutorEntity)
  executors: ExecutorEntity[];

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}
