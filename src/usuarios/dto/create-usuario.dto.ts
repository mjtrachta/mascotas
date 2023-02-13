import { IsString, IsNumber, IsEmail, IsNotEmpty, IsPositive, Min, Max, IsDate} from "class-validator";


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

  @IsDate()
  readonly fecha_de_nacimiento: Date;

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
  readonly fecha_de_nacimiento: Date;

}
