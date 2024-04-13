import { IsArray, IsNotEmpty, ArrayMinSize, IsUUID } from 'class-validator';

export class GetUsersByIdDto {
    @IsArray()
    @ArrayMinSize(1)
    @IsUUID(4, { each: true })
    ids: string[];
  }