import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExecutorService } from './executor.service';
import { CreateExecutorDto } from './dto/create-executor.dto';

@Controller('/:taskId/executors')
export class ExecutorController {
  constructor(private readonly executorService: ExecutorService) {}

  @Get()
  findByTaskId(@Param('taskId') taskId: string) {
    return this.executorService.findByTaskId(taskId);
  }

  @Post()
  create(@Param('taskId') taskId: string, @Body() dto: CreateExecutorDto) {
    return this.executorService.create(taskId, dto);
  }
}
