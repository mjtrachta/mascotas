import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, HttpException, HttpStatus } from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Mascotas } from 'src/mascotas/mascota.entity';


@ApiBearerAuth()
@ApiTags('turnos')
@Controller('turnos')
export class TurnosController {
  constructor(private readonly turnosService: TurnosService) {}


  // endpoints 3 Registrar un turnos:(crea el turno falta verificar disponibilidad)
 /* @Post()
  crearTurno2(@Body() nuevoTurno: CreateTurnoDto){
    return this.turnosService.crearTurno2(nuevoTurno)
    }*/

    @Post()
  async crearTurno(@Body() createTurnoDto: CreateTurnoDto, @Body() mascota: Mascotas) {
    try {
      const turno = await this.turnosService.crearTurno(createTurnoDto, mascota);
      return turno;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
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
  @Req() req
) {
  const fechaInicioDate = fechaInicio ? new Date(fechaInicio) : new Date();
  return this.turnosService.getTurnosByPsico(idPsicologo, fechaInicioDate);
}
}
