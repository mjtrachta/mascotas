import {IsEmail, maxLength, MaxLength, minLength, MinLength} from 'class-validator'

export class LoginAuthDto {

  @IsEmail()
  Email: string;

  @MaxLength(20)
  Password: string;
}
