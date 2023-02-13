import { Controller, Get, Post, Body, Put  } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CrearUsuarioDTO } from './DTO/crear-usuario.dto';
import { UsuariosService } from './usuarios.service';



@ApiBearerAuth()
@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {


  constructor(private readonly usuariosService: UsuariosService) {}

    //@UseGuards(JwtAuthGuard)
    @Get()
    getUsuarios(){
      return this.usuariosService.getUsuarios();
    }

    @Post()
    crearUsuario(@Body() nuevoUsuario: CrearUsuarioDTO){
      return this.usuariosService.crearUsuario(nuevoUsuario)

    }

  }

