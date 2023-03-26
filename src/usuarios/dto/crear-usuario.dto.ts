import { IsString, IsNumber, IsEmail, IsNotEmpty, IsPositive, Min, Max} from "class-validator";
import { isNotEmpty, isString } from "class-validator/types/decorator/decorators";
import { PartialType } from "@nestjs/swagger";

export class CrearUsuarioDTO{

  @IsPositive()
  @IsNumber()
  readonly Id_usuario : number;

  @IsString()
  @IsNotEmpty()
  readonly Nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly Apellido: string;


  readonly Email: string;


  readonly Password: string;

  @Min(1)
  @Max(3)
  @IsNumber()
  @IsNotEmpty()
  readonly Role: number;
/*
  @IsPositive()
  @IsNumber()
  readonly dni : number;

  @IsString()
  readonly numero_telefono: string;
*/
}
/*
export class ActualizarUsuarioDTO{

  readonly Id_usuario? : number;
  readonly Nombre?: string;
  readonly Apellido?: string;
  readonly Email?: string;
  readonly Password?: string;
  readonly Role?: number;

  readonly dni?: number;
  readonly numero_telefono?: string;

}
*/

export class GetUsuarioDTO{

  readonly Id_usuario : number;
  readonly Nombre: string;
  readonly Apellido: string;
  readonly Email: string;
  readonly Password: string;
  readonly Role: number;
  /*
  readonly dni : number;
  readonly numero_telefono: string;
  */
}

export class ActualizarUsuarioDTO extends PartialType(CrearUsuarioDTO){}
