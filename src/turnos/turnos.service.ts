import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, IsNull, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { CreateTurnoDto, GetTurnoDTO } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { Turnos } from './entities/turno.entity';
import { Mascotas } from 'src/mascotas/mascota.entity';
import { parseISO, addMinutes, addHours } from 'date-fns';
import { MascotasService } from '../mascotas/mascotas.service';




@Injectable()
export class TurnosService {
  id_turno: CreateTurnoDto;


  constructor(@InjectRepository(Turnos) private turnosRepository: Repository<Turnos>,
              @InjectRepository(Mascotas) private mascotasRepository: Repository<Mascotas>,) {}

  // endpoints 2 VerTurnosDisponibles:(Falta)

  async VerTurnosDisponibles(turnosDisponibles:GetTurnoDTO): Promise<Date[]> {
    //primero obtengo el tipo para ver el tiempo de la consulta
    const obtengoTipo = await await this.mascotasRepository.find({
      select: {
        especie: true,
      },
      where: {
        id_mascota: turnosDisponibles.id_mascota_turno,
      },
    });
    const tipo = obtengoTipo[0].especie;
    const duracion = tipo === 'perro' ? 30 : 45; // duración según el tipo de mascota
    const fechaInicio = new Date(turnosDisponibles.fecha_inicio); // convertir la fecha a un objeto Date
    fechaInicio.setHours(9, 0, 0, 0); // establecer la hora de inicio de la agenda
    const fechaFin = new Date(turnosDisponibles.fecha_inicio);
    fechaFin.setHours(18, 0, 0, 0); // establecer la hora de fin de la agenda

    //obtengo los turnos programados para esa fecha
    const turnos = await this.turnosRepository.find({
      where: {
        fecha_inicio: fechaInicio,
        id_psicologo_turno: turnosDisponibles.id_psicologo_turno,
      },
    });

    const horariosDisponibles = []; //creo array para guardar los turnos disponibles
    let hora = fechaInicio;
    while (hora <= fechaFin) {
      // verificar si la hora está disponible
      const horaFin = new Date(hora.getTime() + duracion * 60000);
      const disponible = await this.turnosRepository.count({
        where: [
          {
            fecha_inicio: LessThanOrEqual(horaFin),
            fecha_fin: MoreThanOrEqual(hora),
          },
          {
            fecha_inicio: LessThan(hora),
            fecha_fin: MoreThan(horaFin),
          },
        ],
      });

      console.log('DISPONIBILIDAD ' + ' ' + disponible);

      if (disponible == 0) {
        horariosDisponibles.push(new Date(hora));
      }
      // avanzar a la siguiente hora
      hora = new Date(hora.getTime() + 15 * 60000); // avanzar en bloques de 15 minutos
    }
    return horariosDisponibles;
  }

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
  async terminarTurno(id_turno: number, nota: string) {
    const turno = await this.turnosRepository.findOne({ where: { id_turno } });
    if (!turno) {
      throw new Error(`El turno con id ${id_turno} no existe.`);
    }
    if (turno.estado_turno !== 1) {
      throw new Error(`No se puede terminar el turno porque el estado actual del turno no es 1.`);
    }
    turno.estado_turno = 3;
    turno.nota = nota;
    return this.turnosRepository.save(turno);
  }
}






/*async verTurnos(idUsuario: number) {Promise<any>
    const result = await this.turnosRepository.query(
    `select id_turno, fecha_inicio, fecha_fin, Estado_turno, m.nombre, id_usuario
    from turnos t
    join Mascotas m on t.Id_mascota_turno = m.id_mascota
    join Usuarios2 u on m.propietario = u.Id_usuario
    where Estado_turno = 1 and ${idUsuario}`);
    return result;
    } */


