import { ApiProperty } from '@nestjs/swagger';

export class TaskResponseDto {
  @ApiProperty({
    description: 'Task id',
    example: '123456',
  })
  id: number;

  @ApiProperty({
    description: 'Task title',
    example: 'Task 1',
    maximum: 10,
    minimum: 3,
    required: true,
  })
  title: string;
}
