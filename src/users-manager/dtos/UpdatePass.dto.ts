import { IsArray, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class UpdatePasswordDto {
    @IsString()
    @IsUUID()
    userId:string

    @IsString()
    @MinLength(8)
    @MaxLength(24)    
    password:string
}