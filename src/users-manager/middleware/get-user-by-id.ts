import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CLIENT_RENEG_LIMIT } from 'tls';

@Injectable()
export class UuidsQueryMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const ids = req.query['ids'];
    if (typeof ids === 'string') {
      req.query['ids'] = ids.split(',');
    }
    next();
  }
}
