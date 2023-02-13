import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity({name: 'Mascotas'})
export class Mascotas {
  //@PrimaryGeneratedColumn()
  @PrimaryColumn()
  id_mascota : number
  @Column()
  especie: string
  @Column()
  raza: string
  @Column()
  nombre: string
  @Column()
  apellido: string
  @Column({unique: true})
  sexo: string
 // @Column()
 // fecha_de_nacimiento: Date
  @Column()
  propietario: number
}
