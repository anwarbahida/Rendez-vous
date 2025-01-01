import { Controller,UseGuards, Post,Get, Body, Put, Param, UsePipes, ValidationPipe,Delete } from '@nestjs/common';
import { RendezVousService } from './rendez_vous.service';
import { CreateRendezVousDto } from './dto/create-rendez-vous.dto';
import { UpdateRendezVousDto } from './dto/update-rendez-vous.dto';
import { JwtAuthGuard } from 'src/auth/wt.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('rendez-vous')
export class RendezVousController {
  constructor(private readonly rendezVousService: RendezVousService) {}
  // @UseGuards(JwtAuthGuard, RolesGuard) 
  // @Roles('infirmier-de-bureau')
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createRendezVousDto: CreateRendezVousDto) {
    return this.rendezVousService.create(createRendezVousDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(
    @Param('id') id: string,
    @Body() updateRendezVousDto: UpdateRendezVousDto,
  ) {
    return this.rendezVousService.update(id, updateRendezVousDto);
  }
  @Get('patient/:patientId')
  async findByPatientId(@Param('patientId') patientId: string) {
    return this.rendezVousService.findByPatientId(patientId);
  }
  @Get('medecin/:medecinId')
async findByMedecinId(@Param('medecinId') medecinId: string) {
  return this.rendezVousService.findByMedecinId(medecinId);
}
   // Méthode GET pour récupérer tous les rendez-vous
   @Get()
   async findAll() {
     return this.rendezVousService.findAll();
   }
 
   // Méthode GET pour récupérer un rendez-vous par ID
   @Get(':id')
   async findOne(@Param('id') id: string) {
    console.log(`Received ID for update: ${id}`);
     return this.rendezVousService.findOne(id);
   }

  @Delete(':id')
  async delete(@Param('id') id: string) {
     return this.rendezVousService.delete(id);
  }
}
