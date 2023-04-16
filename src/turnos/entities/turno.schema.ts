import { Mascotas } from 'src/mascotas/mascota.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types, Document, ObjectId } from 'mongoose';
import { MascotasSchema } from '../usuarios.schema';

@Schema({ collection: 'Turnos' })
export class Turnos extends Document {
  @Prop()
  id_turno: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: "Mascotas" })
  id_mascota_turno: ObjectId;

  @Prop()
  fecha_inicio: Date;

  @Prop()
  fecha_fin: Date;

  @Prop()
  estado_turno: number;

  @Prop()
  id_psicologo_turno: number;

  @Prop()
  nota: string;
}

export const TurnosSchema = SchemaFactory.createForClass(Turnos);
