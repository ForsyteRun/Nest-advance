import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequest } from './dto/register.dto';
import { LoginRequest } from './dto/login.dto';
import type { Response, Request } from 'express';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthResponse } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Registration',
    description: 'User registration',
  })
  @ApiOkResponse({ type: AuthResponse })
  @ApiBadRequestResponse({
    description: 'Bad request',
    schema: {
      example: {
        message: ['email must be an email'],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiConflictResponse({
    description: 'User already exists',
    schema: {
      example: {
        message: 'User already exists',
        error: 'Conflict',
        statusCode: 409,
      },
    },
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterRequest,
  ) {
    return await this.authService.register(res, dto);
  }

  @ApiOperation({
    summary: 'Login',
    description: 'User login',
  })
  @ApiOkResponse({ type: AuthResponse })
  @ApiBadRequestResponse({
    description: 'Bad request',
    schema: {
      example: {
        message: ['email must be an email'],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'User not exists',
    schema: {
      example: {
        message: 'User not exists',
        error: 'NotFound',
        statusCode: 404,
      },
    },
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginRequest,
  ) {
    return await this.authService.login(res, dto);
  }

  @ApiOperation({
    summary: 'Refresh token',
    description: 'Refresh token and return new access token',
  })
  @ApiOkResponse({ type: AuthResponse })
  @ApiUnauthorizedResponse({
    description: 'Refresh token not found',
    schema: {
      example: {
        message: 'Refresh token not found',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    schema: {
      example: {
        message: 'User not found',
        error: 'NotFound',
        statusCode: 404,
      },
    },
  })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.refresh(req, res);
  }

  @ApiOperation({
    summary: 'Logout from app',
  })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    return await this.authService.logout(res);
  }
}
