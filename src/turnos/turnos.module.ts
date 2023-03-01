import { Module } from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { TurnosController } from './turnos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { Turnos } from './entities/turno.entity';



@Module({
  imports: [TypeOrmModule.forFeature([Turnos])],
  controllers: [TurnosController],
  providers: [TurnosService, JwtStrategy]
})
export class TurnosModule {}
