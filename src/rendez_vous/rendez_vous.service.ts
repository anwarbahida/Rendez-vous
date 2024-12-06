import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RendezVous } from './rendez_vous.entity';
import { CreateRendezVousDto } from './dto/create-rendez-vous.dto';
import { UpdateRendezVousDto } from './dto/update-rendez-vous.dto';
import { EmailService } from '../email/email.service'; // Assurez-vous que vous importez le bon service

@Injectable()
export class RendezVousService {
  constructor(
    @InjectRepository(RendezVous)
    private readonly rendezVousRepository: Repository<RendezVous>, // Nom de la variable corrigé ici
    private readonly emailService: EmailService, // Injection du service Email
  ) {}

  async create(createRendezVousDto: CreateRendezVousDto): Promise<RendezVous> {
    const rendezVous = this.rendezVousRepository.create(createRendezVousDto);
    const savedRendezVous = await this.rendezVousRepository.save(rendezVous);

    // Récupérer les emails du patient et du médecin
    const patientEmail = savedRendezVous.patient.email;
    const doctorEmail = savedRendezVous.medecin.email;

    const subject = 'Confirmation de votre rendez-vous';
    const message = `Votre rendez-vous est confirmé pour le ${savedRendezVous.date} à ${savedRendezVous.heure}.`;

    // Envoi des emails
    await this.emailService.sendEmail(patientEmail, subject, message);
    await this.emailService.sendEmail(doctorEmail, subject, message);

    return savedRendezVous;
  }

  async findAll(): Promise<RendezVous[]> {
    return await this.rendezVousRepository.find(); // Correction du nom de variable
  }

  async findOne(id: string): Promise<RendezVous> {
    const rendezVous = await this.rendezVousRepository.findOne({ where: { id } }); // Correction du nom de variable
    if (!rendezVous) {
      throw new NotFoundException(`Rendez-vous with id ${id} not found`);
    }
    return rendezVous;
  }

  async update(id: string, updateRendezVousDto: UpdateRendezVousDto): Promise<RendezVous> {
    const rendezVous = await this.findOne(id); // Correction du nom de variable
    Object.assign(rendezVous, updateRendezVousDto);
    return await this.rendezVousRepository.save(rendezVous); // Correction du nom de variable
  }

  async delete(id: string): Promise<string> {
    const result = await this.rendezVousRepository.delete(id); // Correction du nom de variable
    if (result.affected === 0) {
      throw new NotFoundException('Rendez-vous not found');
    }
    return `Rendez-vous with ID ${id} has been deleted successfully.`;
  }
}
