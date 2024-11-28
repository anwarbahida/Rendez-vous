import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Requête envoyée vers: ${req.originalUrl}`); 
    console.log("logging middleware est éxcuté ...") ;
    next(); 
  }
}
