import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";



@Entity({name: 'Usuarios2'})
export class Usuarios {
  //@PrimaryGeneratedColumn()
  @PrimaryColumn()
  id_usuario : number
  @Column()
  nombre: string
  @Column()
  apellido: string
  @Column({unique: true})
  email: string
  @Column()
  password: string
  @Column()
  id_rol: number
}
