import  UserManagerService  from '../users-manager/users-manager.service';
import * as jwt from 'jsonwebtoken';
import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import handleRsponse from 'libs/responseHandler/responseHandler';
import * as dotenv from 'dotenv'
import {CONSTANTS} from 'libs/constants';
import * as bcrypt from 'bcrypt'
import { hideData } from 'libs/security/hide';
dotenv.config()

@Injectable()
export default class AuthManagerService {

    constructor(
        private usersManagerService: UserManagerService
    ){}

  async login(loginData:LoginDto) {
    try {
        const { email, password } = loginData;
        const user = await this.usersManagerService.findUserByEmail(email)

        if ((!user || user.status !== CONSTANTS.ENUMS.UserStatusEnum.ACTIVE) && !await bcrypt.compare(password,user.password)) {
          return new BadRequestException('Incorrect cerentials')
        }
        const hidenActions = hideData(JSON.stringify(user.role.actions))
        console.log("hidenActions -> ",hidenActions)

        const userData = {
          id:user.id,
          email:email,
          role:user.role.id,
          actions: hidenActions
        }
        const hidenUserData = hideData(JSON.stringify(userData))
        console.log("hidenUserData -> ",hidenUserData)
        
        const token = this.createJWT(hidenUserData);

        return handleRsponse(200,"User logged in",{token});
    } catch (error) {
      console.log(error.message,error.stack, 'contexto: login');
    }
  }

  createJWT(data:string): string {
    try {
          const secretKey = process.env.JWT_SECRET
          const token = jwt.sign({userdata:data}, secretKey, { expiresIn: '3h' });
          return token
    } catch (error) {
      console.log(error.message,error.stack, 'contexto: createJWT');
    }
  }
}