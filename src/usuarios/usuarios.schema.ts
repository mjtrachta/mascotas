import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Mascotas } from 'src/mascotas/mascota.schema';

@Schema({ collection: 'usuarios' })
export class Usuarios extends Document {

  @Prop({required: true, type: Number})
  Id_usuario: number;

  @Prop()
  Nombre: string;

  @Prop()
  Apellido: string;

  @Prop({required: true})
  Email: string;

  @Prop({required: true})
  Password: string;

  @Prop({required: true})
  Role: string;
/*
  @Prop()
  Dni: number;

  @Prop()
  numero_telefono: string;
*/
  //@Prop([{ type: String, ref: 'Mascotas' }])
  //mascotas: string[];
}

export const UsuariosSchema = SchemaFactory.createForClass(Usuarios);
