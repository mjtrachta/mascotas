import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { Turnos } from './entities/turno.entity';
import { Mascotas } from 'src/mascotas/mascota.entity';
import { parseISO, addMinutes, addHours } from 'date-fns';

@Injectable()
export class TurnosService {
  id_turno: CreateTurnoDto;


  constructor(@InjectRepository(Turnos) private turnosRepository: Repository<Turnos>) {}

  // endpoints 3 Registrar un turnos:(crea el turno falta verificar disponibilidad)
  async crearTurno(turno: CreateTurnoDto, mascota: Mascotas){
    const duracion = mascota.especie === 'perro' ? 30 : 45;

    const fechaInicio = new Date(turno.fecha_inicio);
    const fechaInicioISO = fechaInicio.toISOString();
    const fechaFin = addMinutes(fechaInicio, duracion);

    // Comprobar si la mascota tiene un turno activo
    const tieneTurnoActivo = await this.turnosRepository.findOne({
      where: { mascota: { id_mascota: turno.id_mascota_turno }, fecha_fin: null }
    });

    if (tieneTurnoActivo) {
      throw new Error('La mascota ya tiene un turno activo');
    }

    // Buscar un hueco libre en el horario del psicólogo
    const tieneHuecoLibre = await this.turnosRepository.findOne({
      where: {
        id_psicologo_turno: turno.id_psicologo_turno,
        fecha_inicio: Between(turno.fecha_inicio, fechaFin),
        fecha_fin: null
      }
    });

    if (tieneHuecoLibre) {
      throw new Error('No hay hueco libre para la mascota en ese horario');
    }

    const nuevoTurno = this.turnosRepository.create({
      ...turno, mascota: { id_mascota: turno.id_mascota_turno },
      fecha_fin: fechaFin,
    });
    return this.turnosRepository.save(nuevoTurno);
  }

  // endpoints 4 Ver mis turnos:
  async getTurnosByUser(id_usuario: number): Promise<Turnos[]> {
    const query = await this.turnosRepository
      .createQueryBuilder('turnos')
      .select([
        'turnos.id_turno',
        'turnos.fecha_inicio',
        'turnos.fecha_fin',
        'turnos.Estado_turno',
        'mascotas.nombre',
        'usuarios.id_usuario',
      ])
      .innerJoin('turnos.mascota', 'mascotas')
      .innerJoin('mascotas.propietario', 'usuarios')
      .where('turnos.Estado_turno = :estado and usuarios.id_usuario = :id', {
        estado: 1,
        id: id_usuario,
      })
      .getMany();

    return query;
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

   async getTurnosByPsico(id_psicologo_turno: number, fecha_inicio: Date) {
    const fechaFin = addHours(fecha_inicio, 24);
    //console.log({ where: { id_psicologo_turno, fecha_inicio }});
    return this.turnosRepository.find({
      where: {
        id_psicologo_turno,
        fecha_inicio: Between(fecha_inicio, fechaFin)
      }
    });
  }

  // endpoints 8 terminar cita (acceso psicologo, admin):
  async terminarTurno(id_turno: number) {
    const turno = await this.turnosRepository.findOne({ where: { id_turno } });
    if (!turno) {
      throw new Error(`El turno con id ${id_turno} no existe.`);
    }
    turno.estado_turno = 2;
    return this.turnosRepository.save(turno);
  }

}

  // endpoints 2 VerTurnosDisponibles:




/*async verTurnos(idUsuario: number) {Promise<any>
    const result = await this.turnosRepository.query(
    `select id_turno, fecha_inicio, fecha_fin, Estado_turno, m.nombre, id_usuario
    from turnos t
    join Mascotas m on t.Id_mascota_turno = m.id_mascota
    join Usuarios2 u on m.propietario = u.Id_usuario
    where Estado_turno = 1 and ${idUsuario}`);
    return result;
    } */


