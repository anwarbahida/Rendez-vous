import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsMiddleware } from './patients/middleware/cors.middleware';
import * as dotenv from 'dotenv';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3001);
  app.use(CorsMiddleware);
  dotenv.config();
}
bootstrap();
