import { IsString, IsUUID } from 'class-validator';

export class GetRolesbyCompanyDto{
    @IsString()
    @IsUUID()
    id:string
}
