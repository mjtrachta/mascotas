import { Module } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { connection } from 'mongoose';
import { Config } from 'prettier';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/mascotas'//, {
    //user: "",
    //pass: "",
    //dbName: "",
    //}
    /*
    MongooseModule.forRootAsync({
      useFactory: (ConfigService: ConfigTypes <typerof config>) => {
        consts {
          connection,
          user,
          password,
          host,
          port,
          dbName,
          } = ConfigService.mongo;
        return{
          uri: `${connection}://${host}:${port}`,
          user,
          pass: password,
          dbName,
        };
      },
      inject: [config.KEY],
    }*/
  )],
  exports: [MongooseModule],
})
export class DatabaseModule {}

