import {IsEmail, maxLength, MaxLength, minLength, MinLength} from 'class-validator'

export class LoginAuthDto {

  @IsEmail()
  email: string;

  @MaxLength(20)
  password: string;
}
