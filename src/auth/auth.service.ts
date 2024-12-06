import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Patient } from '../patients/patient.entity'; // Assurez-vous d'utiliser le bon modèle
import { medecin } from '../medecin/medecin.entity'; // Idem pour Medecin
import { JwtPayload } from './interfaces/jwt-payload.interface';  // Interface du Payload JWT

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(medecin)
    private medecinRepository: Repository<medecin>,
    private jwtService: JwtService,
  ) {}

  async registerPatient(patientDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(patientDto.password, 10);
    const newPatient = this.patientRepository.create({
      ...patientDto,
      password: hashedPassword,
    });
    await this.patientRepository.save(newPatient);
    return this.createJwtPayload(newPatient);
  }

  async registerMedecin(medecinDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(medecinDto.password, 10);
    const newMedecin = this.medecinRepository.create({
      ...medecinDto,
      password: hashedPassword,
    });
    await this.medecinRepository.save(newMedecin);
    return this.createJwtPayload(newMedecin);
  }

  async loginPatient(patientDto): Promise<any> {
    const patient = await this.patientRepository.findOne({ where: { email: patientDto.email } });
    if (!patient) {
      throw new Error('Patient not found');
    }
    const validPassword = await bcrypt.compare(patientDto.password, patient.password);
    if (!validPassword) {
      throw new Error('Invalid password');
    }
    return this.createJwtPayload(patient);
  }

  async loginMedecin(medecinDto): Promise<any> {
    const medecin = await this.medecinRepository.findOne({ where: { email: medecinDto.email } });
    if (!medecin) {
      throw new Error('Medecin not found');
    }
    const validPassword = await bcrypt.compare(medecinDto.password, medecin.password);
    if (!validPassword) {
      throw new Error('Invalid password');
    }
    return this.createJwtPayload(medecin);
  }

  private createJwtPayload(user: any): any {
    const payload: JwtPayload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
