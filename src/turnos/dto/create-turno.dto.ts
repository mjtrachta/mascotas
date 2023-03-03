import { IsNumber, IsPositive, IsString } from "class-validator";

export class CreateTurnoDto {

  @IsPositive()
  @IsNumber()
  readonly id_turno : number;

  @IsPositive()
  @IsNumber()
  readonly id_mascota_turno : number;

  readonly fecha_inicio: Date;

  readonly fecha_fin: Date;

  @IsPositive()
  @IsNumber()
  readonly estado_turno : number;

  @IsPositive()
  @IsNumber()
  readonly id_psicologo_turno : number;

  @IsString()
  readonly nota: string;
}

export class ActualizarTurnoDTO{

  readonly id_turno? : number;
  readonly id_mascota_turno? : number;
  readonly fecha_inicio? : Date;
  readonly fecha_fin? : Date;
  readonly estado_turno? : number;
  readonly id_psicologo_turno? : number;
  readonly nota? : string;


}

export class GetTurnoDTO{

  readonly id_turno : number;
  readonly id_mascota_turno : number;
  readonly fecha_inicio : Date;
  readonly fecha_fin : Date;
  readonly estado_turno : number;
  readonly id_psicologo_turno : number;
  readonly nota: string;


}


