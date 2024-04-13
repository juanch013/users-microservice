import { IsArray, IsNotEmpty, ArrayMinSize, IsUUID, IsString } from 'class-validator';

export class GetUsersByCompanyDto {
    @IsUUID(4)
    @IsString()
    id: string;
  }