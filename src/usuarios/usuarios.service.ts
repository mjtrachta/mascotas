// biblioteca que se comunica con la base de datos para hacer operaciones
import { Inject, Injectable } from '@nestjs/common';

import { Usuarios } from './usuarios.schema';

import { CrearUsuarioDTO, ActualizarUsuarioDTO } from './DTO/crear-usuario.dto';
import * as argon2 from 'argon2';
import { UsuariosModule } from './usuarios.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigService, ConfigType } from '@nestjs/config';
import {Db} from 'mongodb'
import { config } from 'process';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class UsuariosService {
  //mail: CrearUsuarioDTO;
  constructor(@InjectModel(Usuarios.name) private readonly usuariosModel: Model<Usuarios>) {}

  getUsuarios() {
    return this.usuariosModel.find();
  }

  // endpoints 1 VerPiscologos:(acceso a admins y clientes)

  getPsicologos() {
    return this.usuariosModel.find({
      select: {
        Id_usuario: true,
        nombre: true,
      },
      where: {
        role: "psicologo", // rol 3 es psicologos
      },
    });
  }
/*
  async crearUsuario(usuario: CrearUsuarioDTO) {
    const nuevoUsuario = this.usuariosRepository.create(usuario);
    const hashPassword = await argon2.hash(nuevoUsuario.Password);
    nuevoUsuario.Password = hashPassword;
    return this.usuariosRepository.save(nuevoUsuario);
  }*/
}
