import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller({
  path: 'user',
  host: 'localhost',
})
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Post()
  findAll(@Body('title') title: string) {
    return title
  }

  @Get('headers')
  getHeaders(@Headers('x-auth') headers: any) {
    return headers
  }
}
