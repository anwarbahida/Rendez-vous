import { Controller, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { RendezVousService } from './rendez_vous.service';
import { CreateRendezVousDto } from './dto/create-rendez-vous.dto';
import { UpdateRendezVousDto } from './dto/update-rendez-vous.dto';

@Controller('rendez-vous')
export class RendezVousController {
  constructor(private readonly rendezVousService: RendezVousService) {}

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
}
