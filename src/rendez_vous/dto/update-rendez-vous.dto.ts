import { IsOptional, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PatientDto {
  @IsNotEmpty()
  @IsString()
  id: string; // Identifiant du patient
}

class MedecinDto {
  @IsNotEmpty()
  @IsString()
  id: string; // Identifiant du médecin
}

export class UpdateRendezVousDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()  // Vous pouvez garder @IsNotEmpty si nécessaire pour les dates/heure
  date?: string; // Exemple : format "YYYY-MM-DD"

  @IsOptional()
  @IsString()
  @IsNotEmpty()  // Vous pouvez garder @IsNotEmpty si nécessaire pour les dates/heure
  heure?: string; // Exemple : format "HH:mm"

  @IsOptional()
  @ValidateNested()
  @Type(() => PatientDto)
  patient?: PatientDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => MedecinDto)
  medecin?: MedecinDto;

  @IsString()
  statut: string;
}
