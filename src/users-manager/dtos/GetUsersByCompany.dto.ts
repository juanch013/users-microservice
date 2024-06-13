import { IsArray, IsBoolean, IsIn, IsJSON, IsOptional, IsString, IsUUID } from 'class-validator';

export class GetUsersByCompanyDto {
    @IsString()
    @IsUUID()
    id:string

    @IsString()
    @IsOptional()
    @IsIn(["true","false"])
    onlyActive:boolean
}