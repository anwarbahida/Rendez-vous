// cors.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.method === '') {
      return res.status(405).json({
        message: 'La méthode GET n\'est pas autorisée',
      }); // Méthode GET interdite
    }
    console.log("le CORS a éxcuté avec sucees "); // Autoriser les requêtes d'origine croisée
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permet à toutes les origines d'accéder à l'API
    res.setHeader('Access-Control-Allow-Methods', ' POST, PUT, DELETE, PATCH, OPTIONS'); // Méthodes autorisées
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // En-têtes autorisés
    
    // Gérer la pré-vérification OPTIONS (cette requête est envoyée par le navigateur avant la requête principale)
    if (req.method === 'OPTIONS') {
      return res.status(204).end();  // Répondre à la pré-vérification CORS
    }

    next(); // Passer à la prochaine étape (contrôleur ou autre middleware)
  }
}
