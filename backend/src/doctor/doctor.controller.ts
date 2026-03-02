import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  create(@Body() dto: CreateDoctorDto) {
    return this.doctorService.create(dto);
  }

  @Get()
  findAll(@Query('active') active?: string) {
    return this.doctorService.findAll(active === 'true');
  }

  @Post('migrate/regenerate-slugs')
  async regenerateSlugs() {
    return await this.doctorService.regenerateMissingSlugs();
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.doctorService.findBySlug(slug);
  }

  @Get(':slugOrId')
  async findOne(@Param('slugOrId') slugOrId: string) {
    return await this.doctorService.findOneBySlugOrId(slugOrId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDoctorDto) {
    return this.doctorService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(id);
  }
}
