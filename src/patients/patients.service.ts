import { Injectable , NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>,
  ) {}

  create(patient: Patient): Promise<Patient> {
    return this.patientsRepository.save(patient);
  }

  findAll(): Promise<Patient[]> {
    return this.patientsRepository.find();
  }
   findOne(id: string): Promise<Patient> {
    const patient = this.patientsRepository.findOneBy({ id });
    return patient;
  }


  async update(id: string, patient: Patient): Promise<Patient> {
    await this.patientsRepository.update(id, patient);
    return this.patientsRepository.findOneBy({ id });
  }

  remove(id: string): Promise<void> {
    return this.patientsRepository.delete(id).then(() => {});
  }
}
