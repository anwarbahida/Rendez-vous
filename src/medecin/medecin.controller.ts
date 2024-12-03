import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode } from '@nestjs/common';
import { MedecinService } from './medecin.service';
import { medecin } from './medecin.entity';

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
}
