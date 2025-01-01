import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register-patient')
  registerPatient(@Body() patientDto) {
    return this.authService.registerPatient(patientDto);
  }
  @Post('login-patient')
  loginPatient(@Body() patientDto) {
    return this.authService.loginPatient(patientDto);
  }
  @Post('login-infirmier')
  async loginInfirmier(@Body() InfirmierDto) {
    return this.authService.loginInfirmier(InfirmierDto);
  }
  @Post('register-infirmier')
  // Appliquer la validation
  async registerInfirmier(@Body() registerInfirmierDto) {
    return this.authService.registerInfirmier(registerInfirmierDto);
  }
  @Post('register-medecin')
  registerMedecin(@Body() medecinDto) {
    return this.authService.registerMedecin(medecinDto);
  }

  @Post('login-medecin')
  loginMedecin(@Body() medecinDto) {
    return this.authService.loginMedecin(medecinDto);
  }

}
