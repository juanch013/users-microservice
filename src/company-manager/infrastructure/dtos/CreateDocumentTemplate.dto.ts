import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateDocumentTemplateDto{
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name:string

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    companyId:string

    @IsString()
    @IsNotEmpty()
    template:string
}
