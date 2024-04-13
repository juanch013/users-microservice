import { IsEmail, IsNotEmpty, IsString, MinLength, IsInt, IsUUID } from 'class-validator';

export class AssignRoleDto {
  @IsNotEmpty()
  @IsUUID(4)
  @IsString()
  roleId: string;

  @IsNotEmpty()
  @IsUUID(4)
  @IsString()
  userId: string;
}
