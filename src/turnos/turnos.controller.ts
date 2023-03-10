import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { CreateTurnoDto, GetTurnoDTO } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Mascotas } from 'src/mascotas/mascota.entity';
import { Turnos } from './entities/turno.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MascotasService} from 'src/mascotas/mascotas.service';


@ApiBearerAuth()
@ApiTags('turnos')
@Controller('turnos')
export class TurnosController {


  constructor(
    private readonly turnosService: TurnosService,
    private readonly mascotasService: MascotasService,
    @InjectRepository(Mascotas) // inyectar el repositorio de mascotas
    private readonly mascotasRepository: Repository<Mascotas>, // declarar la propiedad mascotasRepository
  ) {}

  // endpoints 2 VerTurnosDisponibles:(Falta)
  @Get('/disponibles')
  consultarTurnosDisponibles(@Body() turno: GetTurnoDTO) {
    return this.turnosService.VerTurnosDisponibles(turno);
  }

  // endpoints 3 Registrar un turnos:())

  //@UseGuards(AuthGuard('PsicoCliente'))
  @Post('/crear')
  registrarTurno2(@Body() idTurno: CreateTurnoDto) {
    return this.turnosService.crearTurno(idTurno)
  }

  // endpoints 4 Ver mis turnos:()
  //@UseGuards(JwtAuthGuard)
  @Get('/usuario/:idUsuario')
  async getTurnosByUser(@Param('idUsuario') idUsuario: number, @Req() req) {
    return this.turnosService.getTurnosByUser(idUsuario);
  }

  // endpoints 5 Cancelar una cita:
  @Patch('/cancelar/:id_turno')
  async cancelarTurno(@Param('id_turno') idTurno: number) {
    await this.turnosService.cancelarTurno(idTurno);
    return { mensaje: `El turno con id ${idTurno} ha sido cancelado.` };
  }

  // endpoints 7 Ver las citas x Psicologo(acceso psicologo, admin):
  @Get('/psicologo/:idPsicologo')
  async getTurnosByPsico(
    @Param('idPsicologo') idPsicologo: number,
    @Body('fecha_inicio') fechaInicio: string,
    @Req() req,
  ) {
    const fechaInicioDate = fechaInicio ? new Date(fechaInicio) : new Date();
    return this.turnosService.getTurnosByPsico(idPsicologo, fechaInicioDate);
  }

  @Post('/terminar/:id')
  async terminarTurno(
    @Param('id') id_turno: number,
    @Body('nota') nota: string,
  ) {
    try {
      const turno = await this.turnosService.terminarTurno(id_turno, nota);
      return { success: true, data: turno };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
