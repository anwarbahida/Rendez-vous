import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedecinController } from './medecin.controller';
import { MedecinService } from './medecin.service';
import { medecin } from './medecin.entity';
import { databaseConfig } from '../config/database.config';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), TypeOrmModule.forFeature([medecin]), MulterModule.register({dest: './uploads',}),],
  controllers: [MedecinController],
  providers: [MedecinService],
})
export class MedecinModule {}
