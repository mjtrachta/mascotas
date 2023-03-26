import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  UseGuards,
  Param,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CrearUsuarioDTO } from './DTO/crear-usuario.dto';
import { UsuariosService } from './usuarios.service';

@ApiBearerAuth()
@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  //@UseGuards(JwtAuthGuard)
  @Get()
  getUsuarios() {
    return this.usuariosService.getUsuarios();
  }
/*
  // endpoints 1 VerPiscologos:(acceso a admins y clientes)
  @UseGuards(AuthGuard('PsicoUsuario'))
  @Get('psicologos')
  getPsicologos() {
    return this.usuariosService.getPsicologos();
  }

  @Post()
  crearUsuario(@Body() nuevoUsuario: CrearUsuarioDTO) {
    return this.usuariosService.crearUsuario(nuevoUsuario);
  }*/
}
