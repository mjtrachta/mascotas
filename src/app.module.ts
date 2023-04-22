import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { JwtStrategy } from './auth/jwt.strategy';
import { MascotasModule } from './mascotas/mascotas.module';
import { TurnosModule } from './turnos/turnos.module';
import { DatabaseModule } from './database/database.module';
import { GatewayModule } from './chat/gateway.module';
import { Client } from 'soap';
import * as soap from 'soap';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    DatabaseModule,
    UsuariosModule,
    GatewayModule,
    AuthModule,
    MascotasModule,
    TurnosModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'MY_SOAP_CLIENT',
      useFactory: async () => {
        const url = 'https://www.dataaccess.com/webservicesserver/NumberConversion.wso?wsdl';
        const client = await soap.createClientAsync(url);
        return client;
      }
    }, AppService, JwtStrategy, JwtAuthGuard],

})
export class AppModule {}
