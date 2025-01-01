import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Patient } from '../patients/patient.entity'; // Assurez-vous d'utiliser le bon modèle
import { medecin } from '../medecin/medecin.entity'; // Idem pour Medecin
import { JwtPayload } from './interfaces/jwt-payload.interface';  // Interface du Payload JWT
import { InfirmierDeBureau } from 'src/infirmier-de-bureau/infirmier-de-bureau.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(medecin)
    private medecinRepository: Repository<medecin>,
    @InjectRepository(InfirmierDeBureau)
    private readonly infirmierRepository: Repository<InfirmierDeBureau>, 
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
    console.log(newMedecin);
    await this.medecinRepository.save(newMedecin);
    return this.createJwtPayload(newMedecin);
  }
  // Enregistrer un infirmier ou une infirmière de bureau
  async registerInfirmier(registerInfirmierDto): Promise<InfirmierDeBureau> {
    const hashedPassword = await bcrypt.hash(registerInfirmierDto.password, 10); // Hacher le mot de passe
    const newInfirmier = this.infirmierRepository.create({
      ...registerInfirmierDto,
      password: hashedPassword,
    });
    
    await this.infirmierRepository.save(newInfirmier);
    return  this.createJwtPayload(newInfirmier)// Sauvegarder l'infirmier
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
    // Méthode pour connecter un infirmier de bureau
  async loginInfirmier(loginInfirmierDto): Promise<any> {
 
    const { email, password } = loginInfirmierDto; // Extraire email et mot de passe

    // Trouver l'infirmier par email
    const infirmier = await this.infirmierRepository.findOne({ where: { email } });
    if (!infirmier) {
      throw new UnauthorizedException('Email ou mot de passe incorrect'); // Erreur si l'infirmier n'existe pas
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, infirmier.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou mot de passe incorrect'); // Erreur si le mot de passe est incorrect
    }

    // Générer un token JWT
    const payload = { email: infirmier.email, sub: infirmier.id, roles: infirmier.roles };
    return {
      access_token: this.jwtService.sign(payload), // Retourner le token JWT
    };
  }

}
