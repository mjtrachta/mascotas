import { Mascotas } from "src/mascotas/mascota.entity";
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from "typeorm";



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
  @Column()
  dni : number;
  @Column()
  numero_telefono: string;
  @OneToMany(() => Mascotas, mascota => mascota.propietario)
  mascotas: Mascotas[];
}
