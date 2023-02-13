import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuarios } from './entities/usuario.entity';
import * as argon2 from 'argon2'


@Injectable()
export class UsuariosService {
  email: CreateUsuarioDto;

  constructor(@InjectRepository(Usuarios) private usuariosRepository: Repository<Usuarios>) {}

  async create(createUsuarioDto: CreateUsuarioDto){

    const nuevoUsuario = this.usuariosRepository.create(createUsuarioDto)
    const hashPassword = await argon2.hash(nuevoUsuario.password);
    nuevoUsuario.password = hashPassword;
    return this.usuariosRepository.save(nuevoUsuario)
  }



  findAll() {
    return this.usuariosRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
