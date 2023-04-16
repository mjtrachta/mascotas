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
  UseGuards,
} from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { CreateTurnoDto, GetTurnoDTO } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Mascotas } from 'src/mascotas/mascota.schema';
import { Turnos } from './entities/turno.schema';



import { MascotasService} from 'src/mascotas/mascotas.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@ApiBearerAuth()
@ApiTags('turnos')
@Controller('turnos')
export class TurnosController {

  constructor(
    private readonly turnosService: TurnosService,
    private readonly mascotasService: MascotasService,
  ) {}

/*
  // endpoints 2 VerTurnosDisponibles:
  //@UseGuards(AuthGuard('PsicoUsuario'))
  @Get('/disponibles')
  consultarTurnosDisponibles(@Body() turno: GetTurnoDTO) {
    return this.turnosService.verTurnosDisponibles(turno);
  }


  // endpoints 3 Registrar un turnos:())
  //@UseGuards(AuthGuard('PsicoUsuario'))
  @Post('/crear')
  async registrarTurno2(@Body() createTurnoDto: CreateTurnoDto) {
    const turno = await this.turnosService.crearTurno(createTurnoDto);
    return turno;
  }

  // endpoints 4 Ver mis turnos:()
  @UseGuards(AuthGuard('PsicoUsuario'))
  @Get('/usuario/:idUsuario')
  async getTurnosByUser(@Param('idUsuario') idUsuario: number, @Req() req) {
    return this.turnosService.getTurnosByUser(idUsuario);
  }

  // endpoints 5 Cancelar una cita:
  @UseGuards(JwtAuthGuard) /// falta corregir este guards
  @Patch('/cancelar/:id_turno')
  async cancelarTurno(@Param('id_turno') idTurno: number) {
    await this.turnosService.cancelarTurno(idTurno);
    return { mensaje: `El turno con id ${idTurno} ha sido cancelado.` };
  }

  // endpoints 7 Ver las citas x Psicologo(acceso psicologo, admin):
  @UseGuards(AuthGuard('AdminPsico'))
  @Get('/psicologo/:idPsicologo')
  async getTurnosByPsico(
    @Param('idPsicologo') idPsicologo: number,
    @Body('fecha_inicio') fechaInicio: string,
    @Req() req,
  ) {
    const fechaInicioDate = fechaInicio ? new Date(fechaInicio) : new Date();
    return this.turnosService.getTurnosByPsico(idPsicologo, fechaInicioDate);
  }


  // endpoints 8 terminar cita (acceso psicologo, admin):
  @UseGuards(AuthGuard('AdminPsico'))
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
*/
}
