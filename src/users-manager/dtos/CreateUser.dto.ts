import { IsArray, IsEmail, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MaxLength(24)
    name:string

    @IsString()
    @IsEmail()
    email:string
    
    @IsString()
    password:string
    
    @IsString()
    @IsUUID()
    role:string
}



