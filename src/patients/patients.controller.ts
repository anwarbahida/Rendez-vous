import { Controller, Post, Get, Param, Body, Put, Delete,ParseUUIDPipe } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { Patient } from './patient.entity';
import{ValidationPipe}from '@nestjs/common';

@Controller('patients')

export class PatientsController {
  
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(@Body(new ValidationPipe()) patient: Patient): Promise<Patient> {
    return this.patientsService.create(patient);
  }

  @Get()
  findAll(): Promise<Patient[]> {
    return this.patientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseUUIDPipe) id: string): Promise<Patient> {
    return this.patientsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() patient: Patient): Promise<Patient> {
    return this.patientsService.update(id, patient);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.patientsService.remove(id);
  }
}
