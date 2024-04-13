import { IsEmail, IsNotEmpty, IsString, MinLength, IsInt, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsUUID(4)
  @IsString()
  role: string;
}
