
import { Module ,MiddlewareConsumer, ValidationPipe} from '@nestjs/common';
import { PatientsModule } from './patients/patients.module';
import { MedecinModule } from './medecin/medecin.module';
import { LoggingMiddleware } from './patients/middleware/logging.middleware';
import { CorsMiddleware } from './patients/middleware/cors.middleware'; 
import { APP_FILTER ,APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filtres/http-exception.filter'; // Import du middleware
import { ValidationExceptionFilter } from './common/filtres/validation-exception.filter';
import { RendezVousModule } from './rendez_vous/rendez_vous.module';
import { EmailModule } from './email/email.module'; 
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [AuthModule,MedecinModule, PatientsModule, RendezVousModule,EmailModule, AuthModule],  
  // providers: [
  //   {
  //     provide: APP_PIPE,
  //     useClass: ValidationPipe, // Appliquer la validation globalement
  //   },
  //   {
  //     provide: APP_FILTER,
  //     useClass: HttpExceptionFilter, // Filtrer les exceptions HTTP
  //   },
  //   {
  //     provide: APP_FILTER,
  //     useClass: ValidationExceptionFilter, // Filtrer les erreurs de validation
  //   },
  // ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
