import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

export class CreateTaskRequestDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Task 1',
    maximum: 10,
    minimum: 3,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 10)
  title: string;

  @ApiProperty({
    description: 'task note number',
    example: '10',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  note: number;

  @ApiProperty({
    description: 'task executors',
    example: ['Ivan', 'Petr'],
    required: true,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExecutorDto)
  executors: CreateExecutorDto[];

  @ApiPropertyOptional({
    description: 'is public task or not',
    example: 'false',
    type: 'boolean',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @ApiPropertyOptional({
    description: 'task poster url',
    example: 'https://google.com/img.png',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  poster: string;
}
