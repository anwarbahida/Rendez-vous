import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  // Route pour envoyer des notifications
  @Post('send-notification')
  async sendNotification(@Body() sendEmailDto: SendEmailDto) {
    const { patientEmail, doctorEmail, subject, message } = sendEmailDto;

    // Envoi des emails
    await this.emailService.sendEmail(patientEmail, subject, message);
    await this.emailService.sendEmail(doctorEmail, subject, message);

    return { message: 'Emails envoyés avec succès.' };
  }
}
