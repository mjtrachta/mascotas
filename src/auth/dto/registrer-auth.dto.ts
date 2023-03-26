import { PartialType } from '@nestjs/swagger';
import {IsNotEmpty, isNotEmpty} from 'class-validator'
import { LoginAuthDto } from './login-auth.dto';

export class RegistrerAuthDto extends PartialType(LoginAuthDto) {

 @IsNotEmpty()
  Id_usuario: number;
}
