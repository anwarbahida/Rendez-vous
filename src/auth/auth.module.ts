import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { Patient } from '../patients/patient.entity';  // Modèle Patient
import { medecin } from '../medecin/medecin.entity';    // Modèle Medecin
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfirmierDeBureau } from '../infirmier-de-bureau/infirmier-de-bureau.entity';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET|| 'default_secret_key', // Clé secrète pour signer les tokens
      signOptions: { expiresIn: '1h' },  // Temps d'expiration du token
    }),
    TypeOrmModule.forFeature([Patient, medecin,InfirmierDeBureau]), // Importation des entités Patient et Medecin
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
