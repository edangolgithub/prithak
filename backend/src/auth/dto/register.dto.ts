import { IsEmail, IsNotEmpty, IsString, isNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  password: string;

  @IsNotEmpty()
  role:string;
}

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;


  @IsNotEmpty()
  password: string;
}
