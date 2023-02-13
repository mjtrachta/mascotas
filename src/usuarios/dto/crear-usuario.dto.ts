import { IsString, IsNumber, IsEmail, IsNotEmpty, IsPositive, Min, Max} from "class-validator";
import { isNotEmpty } from "class-validator/types/decorator/decorators";

export class CrearUsuarioDTO{

  @IsPositive()
  @IsNumber()
  readonly id_usuario : number;

  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly apellido: string;

  @IsEmail()
  @IsNotEmpty()
  readonly mail: string;

  @IsString()
  @IsNotEmpty()
  readonly pass: string;

  @Min(1)
  @Max(2)
  @IsNumber()
  @IsNotEmpty()
  readonly id_rol: number;

}

export class ActualizarUsuarioDTO{

  readonly id_usuario? : number;
  readonly nombre?: string;
  readonly apellido?: string;
  readonly email?: string;
  readonly password?: string;
  readonly id_rol?: number;

}

export class GetUsuarioDTO{

  readonly id_usuario : number;
  readonly nombre: string;
  readonly apellido: string;
  readonly email: string;
  readonly password: string;
  readonly id_rol: number;

}
