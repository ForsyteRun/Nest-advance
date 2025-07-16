import { Controller, Get, Post, Body, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { StringToLowercasePipe } from './common/pipes/string-to-lowercase.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UsePipes(StringToLowercasePipe)
  @Post()
  createString(@Body('title') title: string): string {
    return `${title} - transformd`;
  }
}
