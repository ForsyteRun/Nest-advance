import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { StringToLowercasePipe } from './common/pipes/string-to-lowercase.pipe';
import { AuthGuard } from './common/guards/auth.guard';
import { UserAgent } from './common/decorators/user-agent.decorator';
import { ResponseInterseptor } from './common/interseptors/response.interseptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@UserAgent() userAgent: string) {
    return {
      userAgent,
      message: 'Protected route',
    };
  }

  @UsePipes(StringToLowercasePipe)
  @Post()
  createString(@Body('title') title: string): string {
    return `${title} - transformd`;
  }
}
