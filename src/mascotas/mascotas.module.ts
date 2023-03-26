import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MascotasController } from './mascotas.controller';
import { MascotasService } from './mascotas.service';
import { MascotasSchema } from './mascota.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Mascotas', schema: MascotasSchema }])],
  controllers: [MascotasController],
  providers: [MascotasService, JwtStrategy]
})
export class MascotasModule {}
