import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
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
      entities: ["dist/**/*.entity.js"],

      extra: {trustServerCertificate:true}
    }),
    UsuariosModule,
    AuthModule,


  ],

  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
