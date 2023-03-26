import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Mascotas, MascotasSchema } from 'src/mascotas/mascota.schema';
import { JwtStrategy } from '../auth/jwt.strategy';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { Usuarios, UsuariosSchema } from '../usuarios/usuarios.schema';
import { Turnos, TurnosSchema } from './entities/turno.schema';
import { TurnosController } from './turnos.controller';
import { TurnosService } from './turnos.service';
import { MascotasService } from 'src/mascotas/mascotas.service';
import { psicologoAdminStrategy } from 'src/auth/admin-psico.strategy';
import { psicologoUsuarioStrategy } from 'src/auth/admin-cli.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Turnos.name, schema: TurnosSchema },
      { name: Mascotas.name, schema: MascotasSchema },
      { name: Usuarios.name, schema: UsuariosSchema },
    ]),
    UsuariosModule,
    JwtModule,
  ],
  controllers: [TurnosController],
  providers: [
    TurnosService,
    JwtStrategy,
    MascotasService,
    psicologoAdminStrategy,
    psicologoUsuarioStrategy,
  ],
})
export class TurnosModule {}
