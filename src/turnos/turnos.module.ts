import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mascotas } from 'src/mascotas/mascota.entity';
import { JwtStrategy } from '../auth/jwt.strategy';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { Usuarios } from '../usuarios/usuarios.entity';
import { Turnos } from '../turnos/entities/turno.entity';
import { TurnosController } from './turnos.controller';
import { TurnosService } from './turnos.service';
import { MascotasService } from 'src/mascotas/mascotas.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Turnos, Mascotas, Usuarios]),
    UsuariosModule,
    JwtModule,
  ],
  controllers: [TurnosController],
  providers: [TurnosService, JwtStrategy, MascotasService],
})
export class TurnosModule {}
