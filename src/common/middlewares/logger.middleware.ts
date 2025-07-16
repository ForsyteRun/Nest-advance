import type { NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...', req.method, req.url);
    next();
  }
}
