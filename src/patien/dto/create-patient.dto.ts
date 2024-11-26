import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreatePatientDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  medicalHistory?: string;
}
