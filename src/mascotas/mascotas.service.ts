// biblioteca que se comunica con la base de datos para hacer operaciones
import { Injectable } from '@nestjs/common';

import { Mascotas } from './mascota.schema';

import {
  CreateMascotaDto,
  ActualizarMascotaDto,
} from './dto/create-mascota.dto';
import { PaginationQueryDto } from './dto/pagination.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MascotasService {
  id_mascota: CreateMascotaDto;

  constructor(@InjectModel(Mascotas.name) private readonly mascotaModel: Model<Mascotas>) {}

  // endpoints 6 Ver informacion de una mascota:
  async getMascotasById(id_mascota: number) {
    return this.mascotaModel.findOne({ id_mascota });
  }

  async getMascotasByUser(propietario: number) {
    return this.mascotaModel.find({ propietario: { Id_usuario: propietario } });
  }

  async getMascota({ page, limit }: PaginationQueryDto) {
    const offset = (page - 1) * limit;
    return this.mascotaModel.find().skip(offset).limit(limit);
  }

  async getMascota2() {
    return this.mascotaModel.find();
  }

  async crearMascota(mascota: CreateMascotaDto) {
    const nuevaMascota = new this.mascotaModel(mascota);
    return nuevaMascota.save();
  }
}



