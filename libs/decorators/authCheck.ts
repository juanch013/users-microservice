import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthCheckGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const handler = context.getHandler();

    // if(!await this){}

    const actionId = this.reflector.get<string>('actionId', handler);
    console.log('Custom Param:', actionId);

    if (request) {
      return true;
    }
    
    return false;
  }
}
