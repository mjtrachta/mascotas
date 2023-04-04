import { Mascotas } from 'src/mascotas/mascota.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'Turnos' })
export class Turnos extends Document {
  @Prop()
  id_turno: number;

  @Prop({ type: Number, ref: 'Mascotas' })
  mascota: number;

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
