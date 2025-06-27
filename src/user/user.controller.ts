import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller({
  path: 'user',
  host: 'localhost',
})
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Get()
  findAll(@Query() query: string) {
    return query
  }
}
