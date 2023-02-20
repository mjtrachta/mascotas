import { Controller, Get, Post, Body, Put, Param, UseGuards, Req, Query  } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { PaginationQueryDto } from './dto/pagination.dto';
import { MascotasService } from './mascotas.service';

@ApiBearerAuth()
@ApiTags('mascotas')
@Controller('mascotas')
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) {}

  @UseGuards(JwtAuthGuard)
  @Get('usuario/:idUsuario')
  async getMascotasByUser(@Param('idUsuario') idUsuario: number, @Req() req) {
  return this.mascotasService.getMascotasByUser(idUsuario);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getMascota(@Query() pagination: PaginationQueryDto){
      return this.mascotasService.getMascota(pagination);
    }

  @Get()
  getMascota2(){
      return this.mascotasService.getMascota2();
    }

  @Post()
  crearMascota(@Body() nuevaMascota: CreateMascotaDto){
    return this.mascotasService.crearMascota(nuevaMascota)

    }

  }

