import { PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsEmail,
  IsNotEmpty,
  IsPositive,
  IsDate,
  Min,
  Max,
} from 'class-validator';
//import {  isNotEmpty } from "class-validator/types/decorator/decorators";

export class CreateMascotaDto {
  @IsPositive()
  @IsNumber()
  readonly id_mascota: number;

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

  @IsEmail()
  @IsNotEmpty()
  readonly sexo: string;

  //@IsDate()
  //@IsNotEmpty()
  //readonly fecha_de_nacimiento: Date;

  @IsNumber()
  readonly propietario: number;
}
/*
export class ActualizarMascotaDto {
  readonly id_mascotas?: number;
  readonly especie?: string;
  readonly raza?: string;
  readonly nombre?: string;
  readonly apellido?: string;
  readonly sexo?: string;
  //readonly fecha_de_nacimiento?: string;
  readonly propietario?: number;
}
*/
export class ActualizarMascotaDto extends PartialType(CreateMascotaDto){}

export class GetMascotaDto {
  readonly id_mascotas?: number;
  readonly especie?: string;
  readonly raza?: string;
  readonly nombre?: string;
  readonly apellido?: string;
  readonly sexo?: string;
  //readonly fecha_de_nacimiento?: string;
  readonly propietario?: number;
}
