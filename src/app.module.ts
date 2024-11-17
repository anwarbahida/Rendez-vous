import { Module } from '@nestjs/common';
import { PatientsModule } from './patients/patients.module';
import { MedecinModule } from './medecin/medecin.module';

@Module({
  imports: [PatientsModule, MedecinModule],  
})
export class AppModule {}
