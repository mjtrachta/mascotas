import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuarios } from '../usuarios/usuarios.entity';

@Entity({ name: 'Mascotas' })
export class Mascotas {
  //@PrimaryGeneratedColumn()
  @PrimaryColumn()
  id_mascota: number;
  @Column()
  especie: string;
  @Column()
  raza: string;
  @Column()
  nombre: string;
  @Column()
  apellido: string;
  @Column()
  sexo: string;
  @ManyToOne(() => Usuarios, (usuario) => usuario.id_usuario)
  @JoinColumn({ name: 'propietario' })
  propietario: Usuarios;
}
