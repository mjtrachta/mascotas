
// biblioteca que se comunica con la base de datos para hacer operaciones
import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Mascotas } from './mascota.entity';
import { Repository } from 'typeorm';
import { CreateMascotaDto, ActualizarMascotaDto } from  './dto/create-mascota.dto'
import * as argon2 from 'argon2'
import { MascotasModule } from './mascotas.module';
import { JwtService } from '@nestjs/jwt';
//import { CreateMascotaDto } from './dto/create-mascota.dto';


@Injectable()
export class MascotasService {
  id_mascota: CreateMascotaDto;

constructor(@InjectRepository(Mascotas) private mascotasRepository: Repository<Mascotas>) {}


async getMascotasByUser(propietario: number) {
  return this.mascotasRepository.find({ where: { propietario } });
}

getMascota(){
  return this.mascotasRepository.find()
}

  async crearMascota(mascota: CreateMascotaDto){

    const nuevaMascota = this.mascotasRepository.create(mascota)

    return this.mascotasRepository.save(nuevaMascota)
  }




}

