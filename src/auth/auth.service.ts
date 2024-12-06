import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Patient } from '../patients/patient.entity';
import { medecin } from '../medecin/medecin.entity'; 
import { JwtPayload } from './interfaces/jwt-payload.interface';  
import { InfirmierDeBureau } from 'src/infirmier-de-bureau/infirmier-de-bureau.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,

    @InjectRepository(medecin)
    private medecinRepository: Repository<medecin>,

    @InjectRepository(InfirmierDeBureau)
    private InfirmierDeBureauRepository: Repository<InfirmierDeBureau>,

    private jwtService: JwtService,
  ) {}
  async registerPatient(patientDto): Promise<any> {
    // Vérification si un patient avec cet email existe déjà
    const existingPatient = await this.patientRepository.findOne({ where: { email: patientDto.email } });
    if (existingPatient) {
      throw new Error('Un patient avec cet email existe déjà');
    }
  
    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(patientDto.password, 10);
  
    // Création du patient
    const newPatient = this.patientRepository.create({
      ...patientDto,
      password: hashedPassword,
    });
  
    await this.patientRepository.save(newPatient);
    return this.createJwtPayload(newPatient);
  }
  
  async registerMedecin(medecinDto): Promise<any> {
    // Vérification si un médecin avec cet email existe déjà
    const existingMedecin = await this.medecinRepository.findOne({ where: { email: medecinDto.email } });
    if (existingMedecin) {
      throw new Error('Un médecin avec cet email existe déjà');
    }
  
    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(medecinDto.password, 10);
  
    // Création du médecin
    const newMedecin = this.medecinRepository.create({
      ...medecinDto,
      password: hashedPassword,
    });
  
    await this.medecinRepository.save(newMedecin);
    return this.createJwtPayload(newMedecin);
  }
  
  async registerInfirmierDeBureau(InfirmierDeBureauDto): Promise<any> {
    // Vérification si un infirmier avec cet email existe déjà
    const existingInfirmier = await this.InfirmierDeBureauRepository.findOne({ where: { email: InfirmierDeBureauDto.email } });
    if (existingInfirmier) {
      throw new Error('Un infirmier de bureau avec cet email existe déjà');
    }
  
    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(InfirmierDeBureauDto.password, 10);
  
    // Création de l'infirmier
    const newInfirmierDeBureau = this.InfirmierDeBureauRepository.create({
      ...InfirmierDeBureauDto,
      password: hashedPassword,
    });
  
    await this.InfirmierDeBureauRepository.save(newInfirmierDeBureau);
    return this.createJwtPayload(newInfirmierDeBureau);
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

  async loginInfirmierDeBureau(InfirmierDeBureauDto): Promise<any> {
    const InfirmierDeBureau = await this.InfirmierDeBureauRepository.findOne({ where: { email: InfirmierDeBureauDto.email } });
    if (!InfirmierDeBureau) {
      throw new Error('InfirmierDeBureau not found');
    }
    const validPassword = await bcrypt.compare(InfirmierDeBureauDto.password, InfirmierDeBureau.password);
    if (!validPassword) {
      throw new Error('Invalid password');
    }
    return this.createJwtPayload(InfirmierDeBureau);
  }


  private createJwtPayload(user: any): any {
    const payload: JwtPayload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
