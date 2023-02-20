// biblioteca que se comunica con la base de datos para hacer operaciones
import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Mascotas } from './mascota.entity';
import { Repository } from 'typeorm';
import { CreateMascotaDto, ActualizarMascotaDto } from  './dto/create-mascota.dto'
import { PaginationQueryDto } from './dto/pagination.dto';

@Injectable()
export class MascotasService {
  id_mascota: CreateMascotaDto;

constructor(@InjectRepository(Mascotas) private mascotasRepository: Repository<Mascotas>) {}

async getMascotasByUser(propietario: number) {
  return this.mascotasRepository.find({ where: { propietario } });
}

getMascota({page, limit}: PaginationQueryDto){
  const offset = (page-1)* limit
  return this.mascotasRepository.find({skip: offset, take: limit})
}

getMascota2(){
  return this.mascotasRepository.find()
}

async crearMascota(mascota: CreateMascotaDto){

  const nuevaMascota = this.mascotasRepository.create(mascota)

  return this.mascotasRepository.save(nuevaMascota)
}
}

