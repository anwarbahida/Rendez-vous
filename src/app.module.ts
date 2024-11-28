import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsModule } from './patien/patien.module';
import { InfirmierDeBureauModule } from './infirmier-de-bureau/infirmier-de-bureau.module';
import { InfirmierDeBureau } from './infirmier-de-bureau/infirmier-de-bureau.entity';


@Module({
  imports: [ 
    TypeOrmModule.forRoot({
    type: 'mysql', // ou 'mysql', 'sqlite', selon votre base de données
    host: 'localhost',
    port: 3306, // ou selon votre configuration
    username: 'root',
    password: '',
    database: 'Rendez_vous',
    entities: [InfirmierDeBureau],
    synchronize: false, // Mettre à false pour ne pas créer de tables automatiquement
    logging: true,
  }),
    
    
    PatientsModule,InfirmierDeBureauModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
