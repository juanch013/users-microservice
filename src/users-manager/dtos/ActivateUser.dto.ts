import { IsArray, IsString, IsUUID } from 'class-validator';

export class ActivateUserDto {
    @IsString()
    @IsUUID()
    id:string
}