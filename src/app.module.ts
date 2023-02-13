import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsuariosModule} from './usuarios/usuarios.module';
//import { MascotasModule } from './mascotas/mascotas.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 2471,
      username: 'sa',
      password: '123456',
      database: 'MASCOTAS',
      entities: ["dist/usuarios/entities/usuario.entity.js"],

      extra: {trustServerCertificate:true}
    }),
    UsuariosModule,
   // MascotasModule,
    AuthModule,

  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
