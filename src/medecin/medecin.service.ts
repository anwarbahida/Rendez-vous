import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { medecin } from './medecin.entity';

@Injectable()
export class MedecinService {
  constructor(
    @InjectRepository(medecin)
    private readonly medecinRepository: Repository<medecin>,
  ) {}

  async create(createMedecinDto: Partial<medecin>): Promise<medecin> {
    const newMedecin = this.medecinRepository.create(createMedecinDto);
    return await this.medecinRepository.save(newMedecin);
  }

  async findAll(): Promise<medecin[]> {
    return await this.medecinRepository.find({ relations: ['rendezVous'] });
  }

  async findOne(id: string): Promise<medecin> {
    const medecin = await this.medecinRepository.findOne({
      where: { id },
      relations: ['rendezVous'],
    });
    if (!medecin) {
      throw new NotFoundException(`Medecin with ID ${id} not found`);
    }
    return medecin;
  }

  async update(id: string, updateMedecinDto: Partial<medecin>): Promise<medecin> {
    const medecin = await this.findOne(id);
    Object.assign(medecin, updateMedecinDto);
    return await this.medecinRepository.save(medecin);
  }

  async remove(id: string): Promise<void> {
    const medecin = await this.findOne(id);
    await this.medecinRepository.remove(medecin);
  }

  async updateDiplomaPhoto(id: string, diplomaPhoto: Buffer): Promise<medecin> {
    const medecin = await this.medecinRepository.findOne({ where: { id } });
    if (!medecin) {
      throw new Error('Médecin introuvable');
    }
    medecin.diplomaPhoto = diplomaPhoto;
    return this.medecinRepository.save(medecin);
  }
}
