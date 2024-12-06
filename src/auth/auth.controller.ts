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
  @Post('register-InfirmierDeBureau')
  registerInfirmierDeBureau(@Body() InfirmierDeBureauDto) {
    return this.authService.registerInfirmierDeBureau(InfirmierDeBureauDto);
  }

  @Post('login-patient')
  loginPatient(@Body() patientDto) {
    return this.authService.loginPatient(patientDto);
  }

  @Post('login-medecin')
  loginMedecin(@Body() medecinDto) {
    return this.authService.loginMedecin(medecinDto);
  }

  @Post('login-InfirmierDeBureau')
  loginInfirmierDeBureau(@Body() InfirmierDeBureauDto) {
    return this.authService.loginInfirmierDeBureau(InfirmierDeBureauDto);
  }
}
