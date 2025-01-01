import { Controller, Get, Post, Body, Delete, Param, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { UpdateInfirmierDto } from './dto/update-infirmier.dto';
import { InfirmierDeBureauService } from './infirmier-de-bureau.service';

import { CreateInfirmierDto } from './dto/create-infirmier.dto';


@Controller('infirmier-de-bureau')
export class InfirmierDeBureauController {
  constructor(private readonly infirmierService: InfirmierDeBureauService) {}

  @Patch(':id')
  @UsePipes(ValidationPipe) // Applique le pipe de validation
  async update(@Param('id') id: number, @Body() updateInfirmierDto: UpdateInfirmierDto) {
    return this.infirmierService.update(id, updateInfirmierDto);
  }

  // Récupérer tous les infirmiers de bureau
  @Get()
  findAll() {
    return this.infirmierService.findAll(); // Utiliser le service pour récupérer les données
  }

  // Créer un infirmier de bureau avec validation via ValidationPipe
  @Post()
  @UsePipes(ValidationPipe) // Appliquer le pipe de validation
  async create(@Body() createInfirmierDto: CreateInfirmierDto) {
    return this.infirmierService.create(createInfirmierDto);
  }

  // Récupérer un infirmier de bureau par son ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.infirmierService.findOne(Number(id)); // Assurez-vous de convertir l'ID en nombre
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.infirmierService.remove(Number(id)); // Convertir l'ID en nombre
  }
}