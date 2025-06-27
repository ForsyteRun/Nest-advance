import { IsArray, IsBoolean, IsEnum, IsInt, IsNotEmpty, IsPositive, IsString, IsUrl, Length, Matches, MinLength } from "class-validator";

export enum TagEnum {
  work = 'work',
  home = 'home',
  study = 'study'
}

export class UpdateTaskDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty()
  @Length(3, 10)
  name: string;

  @IsBoolean()
  isCompleted: boolean

  @IsNotEmpty()
  @IsInt({ message: 'Priority must be a number' })
  @IsPositive()
  priority: number

  @IsArray()
  @IsEnum(TagEnum, { each: true })
  tags: string[]

  @MinLength(3)
  @IsString({ message: 'Name must be a string' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  password: string

  @IsUrl({ protocols: ['https'] })
  url: string
}