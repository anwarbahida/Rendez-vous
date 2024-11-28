import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class InfirmierDeBureauMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Logique du middleware (par exemple, afficher l'URL de la requête)
    console.log(`Request... ${req.method} ${req.originalUrl}`);
    
    // Continue l'exécution vers la route cible
    next();
  }
}
