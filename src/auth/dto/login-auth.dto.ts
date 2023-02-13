import {IsEmail, MaxLength, minLength, MinLength} from 'class-validator'

export class LoginAuthDto {

  @IsEmail()
  email: string;

  @MaxLength(12)
  @MinLength(4)
  password: string;
}
