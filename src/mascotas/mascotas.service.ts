/*
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { Mascotas } from './entities/mascota.entity';

@Injectable()
export class MascotasService {
  email: CreateMascotaDto;

  constructor(@InjectRepository(Mascotas) private mascotasRepository: Repository<Mascotas>) {}


  create(createMascotaDto: CreateMascotaDto) {
    return 'This action adds a new mascota';
  }

  findAll() {
    return this.mascotasRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} mascota`;
  }

  update(id: number, updateMascotaDto: UpdateMascotaDto) {
    return `This action updates a #${id} mascota`;
  }

  remove(id: number) {
    return `This action removes a #${id} mascota`;
  }
}
*/
