import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { Usuarios, UsuariosSchema } from './usuarios.schema';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtStrategy } from '../auth/jwt.strategy';
import { psicologoUsuarioStrategy } from '../auth/admin-cli.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Usuarios.name, schema: UsuariosSchema }]),
    AuthModule
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService, JwtAuthGuard, JwtStrategy, psicologoUsuarioStrategy]
})
export class UsuariosModule {}
