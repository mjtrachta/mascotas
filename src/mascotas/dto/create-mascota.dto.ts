import { IsString, IsNumber, IsEmail, IsNotEmpty, IsPositive, Min, Max} from "class-validator";


export class CreateMascotaDto{

  @IsPositive()
  @IsNumber()
  readonly id_mascota : number;

  @IsString()
  @IsNotEmpty()
  readonly especie: string;

  @IsString()
  @IsNotEmpty()
  readonly raza: string;

  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly apellido: string;

  @IsNotEmpty()
  readonly sexo: string;


  @IsNotEmpty()
  readonly fecha_de_nacimiento: Date;


  @IsNumber()
  @IsNotEmpty()
  readonly propietario: number;

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
