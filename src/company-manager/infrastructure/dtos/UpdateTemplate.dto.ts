import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class UpdateTemplateDto{
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    templateId:string

    @IsString()
    @IsNotEmpty()
    template:string
}