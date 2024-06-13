import { IsString, IsUUID, MaxLength, isUUID } from 'class-validator';

export class UpdateCompanyDto{
    @IsString()
    @MaxLength(50)
    name:string

    @IsString()
    @IsUUID()
    id:string

}
