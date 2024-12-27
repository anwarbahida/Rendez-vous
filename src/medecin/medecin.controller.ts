import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MedecinService } from './medecin.service';
import { FileInterceptor } from '@nestjs/platform-express'; 
import { medecin } from './medecin.entity';
import { NotFoundException } from '@nestjs/common';
import * as multer from 'multer';

@Controller('medecin')
export class MedecinController {
  constructor(private readonly medecinService: MedecinService) {}

  @Post()
  async create(@Body() createMedecinDto: Partial<medecin>): Promise<medecin> {
    return await this.medecinService.create(createMedecinDto);
  }

  @Get()
  async findAll(): Promise<medecin[]> {
    return await this.medecinService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<medecin> {
    return await this.medecinService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMedecinDto: Partial<medecin>,
  ): Promise<medecin> {
    return await this.medecinService.update(id, updateMedecinDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    return await this.medecinService.remove(id);
  }

  @Post('upload-diploma')
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.memoryStorage(), // ou multer.diskStorage() si vous souhaitez stocker sur le disque
    limits: { fileSize: 10 * 1024 * 1024 }, // Limite de taille de fichier (par exemple 10 MB)
    fileFilter: (req, file, callback) => {
      // Filtrage des types de fichiers autorisés (par exemple, seulement les fichiers image)
      if (!file.mimetype.startsWith('image')) {
        return callback(new Error('Type de fichier non autorisé'), false);
      }
      callback(null, true);
    },
  }))
  async uploadDiploma(
    @UploadedFile() file: Express.Multer.File,
    @Body('id') id: string,
  ) {
    if (!file) {
      throw new NotFoundException('Aucun fichier téléchargé');
    }
    return this.medecinService.updateDiplomaPhoto(id, file.buffer);
  }
  @Get(':id/photo')
  async getDiplomaPhoto(@Param('id') id: string): Promise<any> {
    const medecin = await this.medecinService.findOne(id);
    if (!medecin || !medecin.diplomaPhoto) {
      throw new NotFoundException('Photo non trouvée');
    }
    
    return {
      headers: { 'Content-Type': 'image/jpeg' },
      body: medecin.diplomaPhoto
    };
  }



}
