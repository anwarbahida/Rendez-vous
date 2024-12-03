import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RendezVousService } from './rendez_vous.service';
import { RendezVousController } from './rendez_vous.controller';
import { RendezVous } from './rendez_vous.entity';
import { PatientsModule } from '../patients/patients.module';  // Assurez-vous que PatientModule est importé
import { MedecinModule } from '../medecin/medecin.module';  // Assurez-vous que PatientModule est importé


@Module({
  imports: [
    TypeOrmModule.forFeature([RendezVous]),
    PatientsModule,  // Importez PatientModule
    MedecinModule,  // Importez PatientModule

  ],
  providers: [RendezVousService],
  controllers: [RendezVousController],
})
export class RendezVousModule {}
