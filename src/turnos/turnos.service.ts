import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { Turnos } from './entities/turno.entity';

@Injectable()
export class TurnosService {
  id_turno: CreateTurnoDto;


  constructor(@InjectRepository(Turnos) private turnosRepository: Repository<Turnos>) {}

  // endpoints 3 Registrar un turnos:(crea el turno falta verificar disponibilidad)
  async crearTurno(turno: CreateTurnoDto){
    const nuevoTurno = this.turnosRepository.create(turno)
    return this.turnosRepository.save(nuevoTurno)
  }

    async verTurnos(idUsuario: number) {Promise<any>
    const result = await this.turnosRepository.query(
    `select id_turno, fecha_inicio, fecha_fin, id_estado, nombre, id_usuario
    from turnos t
    join Mascotas m on t.id_mascota = m.id_mascota
    join Usuarios u on m.propietario = u.Id_usuario
    where id_estado = 1 and id_cliente = ${idUsuario}`);
    return result;
    }

  // endpoints 4 Ver mis turnos:(Lo hace por id de mascota y lo tiene que hacer por id de Usuario)
  async getTurnosByUser(id_mascota_turno: number) {
    return this.turnosRepository.find({ where: { id_mascota_turno }});
  }


  // endpoints 5 Cancelar una cita:
  async cancelarTurno(id_turno: number) {
    const turno = await this.turnosRepository.findOne({ where: { id_turno } });
    if (!turno) {
      throw new Error(`El turno con id ${id_turno} no existe.`);
    }
    turno.estado_turno = 3;
    return this.turnosRepository.save(turno);
  }

   // endpoints 7 Ver las citas x Psicologo(acceso psicologo, admin):
   async getTurnosByPsico(id_psicologo_turno: number) {
    return this.turnosRepository.find({ where: { id_psicologo_turno }});
  }

}

  // endpoints 2 VerTurnosDisponibles:







