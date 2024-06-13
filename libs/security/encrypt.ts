import * as bcrypt from 'bcrypt'
import {userTokenData} from '../constants/interfaces'
export function encrypt(data:string):string{
    try {
        const saltRounds = Number(process.env.SALT_ROUNDS);
        const salt = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(data,salt);
    } catch (error) {
      console.log(error.message,"context: encrypt")
    }
}

export async function verifyJwt(token:string):Promise<true | false> {
  try {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    return true;
  } catch (error) {
    return false
  }
}