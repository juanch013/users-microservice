import { IsArray, IsString, IsUUID } from 'class-validator';

export class GetUsersByIdDto {
    @IsArray()
    @IsString({each:true,})
    @IsUUID('4',{each:true})
    ids:string[]
}