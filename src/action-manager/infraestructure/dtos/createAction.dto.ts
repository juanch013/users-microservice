import { IsString, IsUUID } from "class-validator";

export class CreateActionDto{
    @IsString()
    name:string

    @IsString()
    url:string

    @IsString()
    @IsUUID()
    companyId:string
}