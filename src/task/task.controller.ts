import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTaskRequestDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';
import { TaskResponseDto } from './dto/create.dto';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Get all tasks', description: 'returns all tasks' })
  @ApiResponse({ status: HttpStatus.OK })
  @Get()
  async findAll() {
    return this.taskService.findAll();
  }
  @ApiOperation({ summary: 'Get task by id', description: 'returns by id' })
  @ApiOkResponse({ description: 'task found', type: TaskResponseDto })
  @ApiNotFoundResponse({
    description: 'not found',
    example: {
      status: HttpStatus.NOT_FOUND,
      message: 'Task not found',
      timestamp: '2023-06-14T15:51:17.600Z',
      path: '/task/1',
    },
  })
  @Get(':id')
  async findByTitle(@Param('id') id: string, @Query('title') title: string) {
    return this.taskService.findById(id);
  }

  @ApiOperation({ summary: 'Create task' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'task created',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createTask(@Body() data: CreateTaskRequestDto) {
    return await this.taskService.create(data);
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return await this.taskService.updateFullTask(id, dto);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return await this.taskService.delete(id);
  }
}
