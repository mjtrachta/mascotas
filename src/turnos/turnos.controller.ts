import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags('turnos')
@Controller('turnos')
export class TurnosController {
  constructor(private readonly turnosService: TurnosService) {}

    // endpoints 4 Ver mis turnos:(Lo hace por id de mascota y lo tiene que hacer por id de Usuario)
   //@UseGuards(JwtAuthGuard)
   @Get('/mascota/:idMascota')
   async getTurnosByUser(@Param('idMascota') idMascota: number, @Req() req) {
   return this.turnosService.getTurnosByUser(idMascota);
   }

   @Post()
  crearTurno(@Body() nuevoTurno: CreateTurnoDto){
    return this.turnosService.crearTurno(nuevoTurno)
    }

    // endpoints 5 Cancelar una cita:
   @Patch('/cancelar/:id_turno')
    async cancelarTurno(@Param('id_turno') idTurno: number) {
    await this.turnosService.cancelarTurno(idTurno);
    return { mensaje: `El turno con id ${idTurno} ha sido cancelado.` };
  }

  @Get('/psicologo/:idPsicologo')
  async getTurnosByPsico(@Param('idPsicologo') idPsicologo: number, @Req() req) {
  return this.turnosService.getTurnosByPsico(idPsicologo);
  }

}
