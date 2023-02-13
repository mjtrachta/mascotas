import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity({name: 'Usuarios'})
export class Usuarios {
  //@PrimaryGeneratedColumn()
  @PrimaryColumn()
  id_usuario : number
  @Column()
  nombre: string
  @Column()
  apellido: string
  @Column()
  email: string
  @Column()
  password: string
  @Column()
  id_rol: number
  @Column()
  fecha_de_nacimiento: Date
}
