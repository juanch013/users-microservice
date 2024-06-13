import { IsString, IsUUID, MaxLength, isUUID } from "class-validator"

export class CreateRoleDto{
    @IsString()
    @MaxLength(50)
    name:string

    @IsString()
    @IsUUID()
    companyId:string
}