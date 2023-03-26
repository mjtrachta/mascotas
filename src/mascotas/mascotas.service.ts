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

  constructor(@InjectModel(Mascotas.name) private readonly userModel: Model<Mascotas>) {}

  // endpoints 6 Ver informacion de una mascota:
  async getMascotasById(id_mascota: number) {
    return this.userModel.findOne({ id_mascota });
  }
/*
  async getMascotasByUser(propietario: number) {
    return this.mascotasRepository.find({
      where: { propietario: { Id_usuario: propietario } },
    });
  }

  getMascota({ page, limit }: PaginationQueryDto) {
    const offset = (page - 1) * limit;
    return this.mascotasRepository.find({ skip: offset, take: limit });
  }

  getMascota2() {
    return this.mascotasRepository.find();
  }
}


async crearMascota(mascota: CreateMascotaDto){

  const nuevaMascota = this.mascotasRepository.create(mascota)

  return this.mascotasRepository.save(nuevaMascota)
}
*/
}
