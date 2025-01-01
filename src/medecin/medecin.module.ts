import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedecinController } from './medecin.controller';
import { MedecinService } from './medecin.service';
import { medecin } from './medecin.entity';
import { databaseConfig } from '../config/database.config';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), TypeOrmModule.forFeature([medecin])],
  controllers: [MedecinController],
  providers: [MedecinService],
  exports: [MedecinService],
})
export class MedecinModule {}
