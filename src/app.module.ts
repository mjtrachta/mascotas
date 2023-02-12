import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MascotasModule } from './mascotas/mascotas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 2471,
      username: 'sa',
      password: '123456',
      database: 'HOTEL_EXTRADOS',
      entities: ["dist/**/*.entity.js"],

      extra: {trustServerCertificate:true}
    }),
    MascotasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
