/*import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsMiddleware } from './patients/middleware/cors.middleware';
import * as dotenv from 'dotenv';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3001);
  app.use(CorsMiddleware);
  dotenv.config();
}
bootstrap();*/

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurer les fichiers statiques
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  await app.listen(3000);
}
bootstrap();

