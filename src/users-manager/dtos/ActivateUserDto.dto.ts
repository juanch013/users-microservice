import { IsUUID, IsArray, ArrayMinSize } from 'class-validator';

export class ActivateUserDto {
    @IsArray()
    @ArrayMinSize(1)
    @IsUUID(4, { each: true })
    ids: string;
}
