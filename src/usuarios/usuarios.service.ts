
// biblioteca que se comunica con la base de datos para hacer operaciones
import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from './usuarios.entity';
import { Repository } from 'typeorm';
import { CrearUsuarioDTO, ActualizarUsuarioDTO } from  './DTO/crear-usuario.dto'
import * as argon2 from 'argon2'
import { UsuariosModule } from './usuarios.module';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsuariosService {
  mail: CrearUsuarioDTO;

constructor(@InjectRepository(Usuarios) private usuariosRepository: Repository<Usuarios>) {}


async getTurnosByUser(id_usuario: number) {
  return this.usuariosRepository.find({

  });
}


getUsuarios(){
  return this.usuariosRepository.find()
}

// endpoints 1 VerPiscologos:(acceso a admins y clientes)

getPsicologos(){
  return this.usuariosRepository.find({
    select: {
      id_usuario: true,
      nombre: true,
    },
    where: {
      id_rol: 3,// rol 3 es psicologos

  },
  })

  // endpoints 2 VerTurnosDisponibles:
  // endpoints 3 Registrar un turnos:
  // endpoints 4 Ver mis turnos:
  // endpoints 5 Cancelar una cita:
  // endpoints 6 Ver informacion de una mascota:
  // endpoints 7 Ver mis citas(acceso psicologo, admin):
  // endpoints 8 Terminar cita (acceso psicologo, admin):





}


async crearUsuario(usuario: CrearUsuarioDTO){
    const nuevoUsuario = this.usuariosRepository.create(usuario)
    const hashPassword = await argon2.hash(nuevoUsuario.password);
    nuevoUsuario.password = hashPassword;
    return this.usuariosRepository.save(nuevoUsuario)
  }
}



