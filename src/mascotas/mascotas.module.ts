import { Module } from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { MascotasController } from './mascotas.controller';
import { Mascotas } from './entities/mascota.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Mascotas])],
  controllers: [MascotasController],
  providers: [MascotasService, JwtStrategy]
})
export class MascotasModule {}
