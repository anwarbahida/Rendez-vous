import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConflictException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  @Post('register-patient')
  async registerPatient(@Body() patientDto) {
    try {
      return await this.authService.registerPatient(patientDto);
    } catch (error) {
      if (error.message === 'Un patient avec cet email existe déjà') {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }
  
  @Post('register-medecin')
  async registerMedecin(@Body() medecinDto) {
    try {
      return await this.authService.registerMedecin(medecinDto);
    } catch (error) {
      if (error.message === 'Un médecin avec cet email existe déjà') {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }
  
  
  @Post('login-patient')
  loginPatient(@Body() patientDto) {
    return this.authService.loginPatient(patientDto);
  }

  @Post('login-medecin')
  loginMedecin(@Body() medecinDto) {
    return this.authService.loginMedecin(medecinDto);
  }

}
