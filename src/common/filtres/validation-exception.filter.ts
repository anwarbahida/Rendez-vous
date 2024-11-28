import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    const status = exception instanceof HttpException ? exception.getStatus() : 500;

    const responseBody = exception.getResponse();


    // Si l'exception est une erreur de validation
    if (Array.isArray(responseBody.message)) {
        console.log("l'exception est une erreur de validation ...");
      // Formater les erreurs pour afficher uniquement les messages des contraintes
      const errors = responseBody.message;
3
      // Retourner les erreurs sous forme structurée
      return response.status(status).json({
        statusCode: status,
        message: errors, // Liste des erreurs sous forme de tableau de messages
        error: 'Bad Request', // Message d'erreur spécifique
      });
    }

    // Si ce n'est pas une erreur de validation, retourner l'exception générale
    console.log("l'exception générale ...");
    return response.status(status).json({
      statusCode: status,
      message: responseBody.message || 'Internal server error',
    });
  }
}
