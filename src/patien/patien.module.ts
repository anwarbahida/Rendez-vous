import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Patient } from './patient.entity';
import { PatientsController } from './patien.controller';
import { PatientsService } from './patien.service';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])], // Enregistre le dépôt Patient
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService], 
})
export class PatientsModule {}
