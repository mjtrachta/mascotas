import { Module } from '@nestjs/common';
import { MascotasController } from './mascotas.controller';
import { MascotasService } from './mascotas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mascotas } from './mascota.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Mascotas])],
  controllers: [MascotasController],
  providers: [MascotasService, JwtStrategy]
})
export class MascotasModule {}
