import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class AssignActionToRoleDto{
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    roleId:string

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    actionId:string
}