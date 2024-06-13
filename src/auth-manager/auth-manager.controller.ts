import AuthManagerService from './auth-manager.service';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';

@Controller("auth")
class AuthManagerController {
    constructor(private readonly authManagerService:AuthManagerService){}

    @Post("login")
    async login(@Body() body:LoginDto) {
      try {
        return await this.authManagerService.login(body)
      } catch (error) {
        console.log(error);
      }
    }
}

export default AuthManagerController;
