import { IsString, MaxLength } from 'class-validator';

export class CreateCompanyDto{
    @IsString()
    @MaxLength(50)
    name:string
}
