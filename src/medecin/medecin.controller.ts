
import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { MedecinService } from './medecin.service';
import { medecin } from './medecin.entity';

@Controller('medecin')
export class MedecinController {
    constructor(private readonly MedecinService: MedecinService) {}

 
  @Get()
  findAll(): Promise<medecin[]> {
    return this.MedecinService.finAll();
  }

  
}
