import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import 'bcrypt'
import { encrypt } from 'libs/security/encrypt';

@Injectable()
export class SecurityMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    req.body['password'] = encrypt(req.body['password']);
    next();
  }
}