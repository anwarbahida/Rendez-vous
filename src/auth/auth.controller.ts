import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register-patient')
  registerPatient(@Body() patientDto) {
    return this.authService.registerPatient(patientDto);
  }

  @Post('register-medecin')
  registerMedecin(@Body() medecinDto) {
    return this.authService.registerMedecin(medecinDto);
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
