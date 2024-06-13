import  UserManagerService  from '../users-manager/users-manager.service';
import * as jwt from 'jsonwebtoken';
import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import handleRsponse from 'libs/responseHandler/responseHandler';
import * as dotenv from 'dotenv'
import CONSTANTS from 'libs/constants';
import * as bcrypt from 'bcrypt'
dotenv.config()

@Injectable()
export default class AuthManagerService {

    constructor(
        private usersManagerService: UserManagerService
    ){}

  async login(loginData:LoginDto) {
    try {
        const { email, password } = loginData;
        console.log(loginData)
        const user = await this.usersManagerService.findUserByEmail(email)
        console.log("user -> ",user)
        if ((!user || user.status !== CONSTANTS.ENUMS.UserStatusEnum.ACTIVE) && !await bcrypt.compare(password,user.password)) {
          return new BadRequestException('Incorrect cerentials')
        }
        
        const token = this.createJWT(user.id, user.name,user.role.id);
        return handleRsponse(200,"User logged in",{token});

    } catch (error) {
      console.log(error, 'contexto: login');
    }
  }

    createJWT(email:string,userId:string,role:string): string {
      try {
            const secretKey = process.env.JWT_SECRET 
            const token = jwt.sign({ Id: userId, email: email,role:role }, secretKey, { expiresIn: '3h' });
            return token
      } catch (error) {
        console.log(error, 'contexto: createJWT');
      }
    }
  }

  
