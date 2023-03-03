import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transformOptions: {
      enableImplicitConversion: true
    }
  }));

  const config = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('Mi documentacion API Mascotas')
  .setDescription('Extrados')
  .setVersion('1.0')
  .addTag('usuarios')
  .addTag('auth')
  .addTag('mascotas')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('documentacion', app, document);

  /*
  app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001/", "http://127.0.0.1:5501");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });
 */

  //app.enableCors({origin: ['http://localhost:3001/','http://127.0.0.1:5501/index.html']});
  app.use(cors({ origin: ['http://localhost:3001/', 'http://127.0.0.1:5501'] }));
  await app.listen(3001);



}
bootstrap();
