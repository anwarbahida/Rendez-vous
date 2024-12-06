import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  @IsNotEmpty()
  patientEmail: string;

  @IsEmail()
  @IsNotEmpty()
  doctorEmail: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
