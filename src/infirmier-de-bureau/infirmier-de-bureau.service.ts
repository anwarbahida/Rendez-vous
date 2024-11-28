import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InfirmierDeBureau } from './infirmier-de-bureau.entity';
import { UpdateInfirmierDto } from './dto/update-infirmier.dto';
import { CreateInfirmierDto } from './dto/create-infirmier.dto';

@Injectable()
export class InfirmierDeBureauService {
    constructor(
        @InjectRepository(InfirmierDeBureau)
        private readonly infirmierRepository: Repository<InfirmierDeBureau>,
      ) {}
    
    async update(id: number, updateInfirmierDto: UpdateInfirmierDto): Promise<InfirmierDeBureau> {
        const infirmier = await this.infirmierRepository.findOne({ where: { id } });
        if (!infirmier) {
        throw new Error('Infirmier non trouvé');
    }

    // Mise à jour des champs, sans toucher à l'id
    if (updateInfirmierDto.name) infirmier.name = updateInfirmierDto.name;
    if (updateInfirmierDto.department) infirmier.department = updateInfirmierDto.department;
    if (updateInfirmierDto.phone) infirmier.phone = updateInfirmierDto.phone;
    if (updateInfirmierDto.email) infirmier.email = updateInfirmierDto.email;
    if (updateInfirmierDto.address) infirmier.address = updateInfirmierDto.address;


    return await this.infirmierRepository.save(infirmier);
    }

    // Créer un nouvel infirmier de bureau

    async create(createInfirmierDto: CreateInfirmierDto): Promise<InfirmierDeBureau> {
        // Créer une instance de l'entité avec les données du DTO
        const infirmier = this.infirmierRepository.create(createInfirmierDto);
        
        // Sauvegarder l'entité dans la base de données
        return await this.infirmierRepository.save(infirmier);
    }

    // Récupérer tous les infirmiers de bureau
    async findAll(): Promise<InfirmierDeBureau[]> {
        return await this.infirmierRepository.find();
    }

    // Récupérer un infirmier de bureau par son ID
    async findOne(id: number): Promise<InfirmierDeBureau> {
        return await this.infirmierRepository.findOne({ where: { id } });
    }
    async remove(id: number): Promise<void> {
        const infirmier = await this.infirmierRepository.findOne({ where: { id } });
        if (!infirmier) {
          throw new Error('Infirmier non trouvé');
        }
        await this.infirmierRepository.delete(id);
    }
}
