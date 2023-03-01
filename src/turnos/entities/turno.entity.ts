import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";



@Entity({name: 'Turnos'})
export class Turnos  {
  //@PrimaryGeneratedColumn()
  @PrimaryColumn()
  id_turno : number
  @Column()
  id_mascota_turno: number
  @Column()
  fecha_inicio: Date
  @Column()
  fecha_fin: Date
  @Column()
  estado_turno: number
  @Column()
  id_psicologo_turno: number

}


