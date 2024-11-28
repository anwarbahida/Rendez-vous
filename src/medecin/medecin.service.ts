import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { medecin } from './medecin.entity';

@Injectable()
export class MedecinService {
    constructor(
        @InjectRepository(medecin)
        private medecinRepository: Repository<medecin>,
      ) {}
    finAll(): Promise<medecin[]> {
        return this.medecinRepository.find();
      }
}
