import { IsNotEmpty, IsUUID, MaxLength } from "class-validator";

export class GetTemplateByNameDto{
    @IsUUID()
    @IsNotEmpty()
    companyId:string

    @IsNotEmpty()
    @MaxLength(20)
    name:string
}