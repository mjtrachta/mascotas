import { IsString, IsNumber, IsEmail, IsNotEmpty, IsPositive, Min, Max} from "class-validator";


export class CreateUsuarioDto{

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
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @Min(1)
  @Max(2)
  @IsNumber()
  @IsNotEmpty()
  readonly id_rol: number;

}

export class GetUsuarioDTO{

  readonly id_usuario : number;
  readonly cuil: number;
  readonly nombre: string;
  readonly apellido: string;
  readonly mail: string;
  readonly pass: string;
  readonly id_rol: number;

}
