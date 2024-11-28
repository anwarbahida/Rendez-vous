import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { InfirmierDeBureauService } from './infirmier-de-bureau.service';
import { InfirmierDeBureauController } from './infirmier-de-bureau.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfirmierDeBureau } from './infirmier-de-bureau.entity';
import { InfirmierDeBureauMiddleware } from './infirmier-de-bureau.middleware'; 
import { databaseConfig } from '../config/database.config';// Importez le middleware

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig),TypeOrmModule.forFeature([InfirmierDeBureau])],
  controllers: [InfirmierDeBureauController],
  providers: [InfirmierDeBureauService],
})
export class InfirmierDeBureauModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(InfirmierDeBureauMiddleware) // Appliquer le middleware
      .forRoutes(InfirmierDeBureauController); // Appliquer uniquement au contrôleur InfirmierDeBureau
  }
}
