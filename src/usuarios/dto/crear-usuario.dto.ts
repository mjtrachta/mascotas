import { IsString, IsNumber, IsEmail, IsNotEmpty, IsPositive, Min, Max} from "class-validator";
import { isNotEmpty, isString } from "class-validator/types/decorator/decorators";

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


  readonly mail: string;


  readonly pass: string;

  @Min(1)
  @Max(3)
  @IsNumber()
  @IsNotEmpty()
  readonly id_rol: number;

  @IsPositive()
  @IsNumber()
  readonly dni : number;

  @IsString()
  readonly numero_telefono: string;

}

export class ActualizarUsuarioDTO{

  readonly id_usuario? : number;
  readonly nombre?: string;
  readonly apellido?: string;
  readonly email?: string;
  readonly password?: string;
  readonly id_rol?: number;
  readonly dni?: number;
  readonly numero_telefono?: string;

}

export class GetUsuarioDTO{

  readonly id_usuario : number;
  readonly nombre: string;
  readonly apellido: string;
  readonly email: string;
  readonly password: string;
  readonly id_rol: number;
  readonly dni : number;
  readonly numero_telefono: string;

}
