import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AuthService } from './auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/patients/patient.entity';
import { Repository } from 'typeorm';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>, // Remplacez avec votre entité appropriée
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrait le JWT du header
      secretOrKey: process.env.JWT_SECRET || 'default_secret_key', // Utilise la clé secrète
    });
  }

  async validate(payload: JwtPayload) {
    const { email } = payload; // Récupérer l'email ou d'autres informations du payload
    const patient = await this.patientsRepository.findOne({ where: { email } }); // Vérifier l'utilisateur

    if (!patient) {
      throw new Error('Unauthorized');
    }

    return patient; // Vous pouvez renvoyer d'autres informations sur l'utilisateur
  }
}
