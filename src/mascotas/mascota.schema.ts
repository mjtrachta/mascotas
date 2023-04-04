import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Usuarios } from '../usuarios/usuarios.schema';

@Schema({ collection: 'mascotas' })
export class Mascotas extends Document {

  @Prop()
  id_mascota: number;

  @Prop()
  especie: string;

  @Prop()
  raza: string;

  @Prop()
  nombre: string;

  @Prop()
  apellido: string;

  @Prop()
  sexo: string;

  @Prop({ type: Number })
  propietario: number;

}

export const MascotasSchema = SchemaFactory.createForClass(Mascotas);
