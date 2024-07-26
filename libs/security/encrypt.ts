import * as bcrypt from 'bcrypt'

export function encrypt(data:string):string{
    try {
        const saltRounds = Number(process.env.SALT_ROUNDS);
        const salt = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(data,salt);
    } catch (error) {
      console.log(error.message,"context: encrypt")
    }
}