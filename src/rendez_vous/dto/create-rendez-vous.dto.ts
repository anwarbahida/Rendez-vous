import { IsNotEmpty, IsString, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PatientDto {
    @IsNotEmpty()
    @IsString()  // Changez en IsString car l'ID est de type string (UUID)
    id: string;  // Utilisez un type string pour le UUID
}
  
class MedecinDto {
    @IsNotEmpty()
    @IsString()  // Changez en IsString car l'ID est de type string (UUID)
    id: string;  // Utilisez un type string pour le UUID
}

export class CreateRendezVousDto {
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  heure: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PatientDto)
  patient: PatientDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => MedecinDto)
  medecin: MedecinDto;


  @IsString()
  statut: string;
}