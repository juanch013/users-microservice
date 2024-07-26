import * as CryptoJS from 'crypto-js';
import * as dotenv from 'dotenv';
dotenv.config()

export function hideData(data:string):string{
    try {
        const secretKey: string = process.env.HIDE_KEY

        const encryptedData: string = CryptoJS.AES.encrypt(data, secretKey).toString();

        console.log("Datos encriptados: ", encryptedData);

        return encryptedData;
    } catch (error) {
        console.log(error.message,error.stack,"context: hideData")
    }
}