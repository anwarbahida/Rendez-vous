import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RendezVous } from './rendez_vous.entity';
import { CreateRendezVousDto } from './dto/create-rendez-vous.dto';
import { UpdateRendezVousDto } from './dto/update-rendez-vous.dto';


@Injectable()
export class RendezVousService {
  constructor(
    @InjectRepository(RendezVous)
    private readonly RendezVousRepository: Repository<RendezVous>,
  ) {}

  async create(createRendezVousDto: CreateRendezVousDto): Promise<RendezVous> {
    const RendezVous = this.RendezVousRepository.create(createRendezVousDto);
    return await this.RendezVousRepository.save(RendezVous);
  }

  async findAll(): Promise<RendezVous[]> {
    return await this.RendezVousRepository.find();
  }

  async findOne(id: string): Promise<RendezVous> {
    const rendezVous = await this.RendezVousRepository.findOne({where : {id}});
    if (!rendezVous) {
      throw new NotFoundException(`Rendez-vous with id ${id} not found`);
    }
    return rendezVous;
  }

  async update(id: string, updateRendezVousDto: UpdateRendezVousDto): Promise<RendezVous> {
    const RendezVous = await this.findOne(id);
    Object.assign(RendezVous, updateRendezVousDto);
    return await this.RendezVousRepository.save(RendezVous);
  }

  async delete(id: string): Promise<string> {
    const result = await this.RendezVousRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Rendez-vous not found');
    }
    return `Rendez-vous with ID ${id} has been deleted successfully.`;
  }
}