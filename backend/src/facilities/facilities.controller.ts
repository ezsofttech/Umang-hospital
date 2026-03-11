import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { CreateFacilitiesDto } from './dto/create-facilities.dto';
import { UpdateFacilitiesDto } from './dto/update-facilities.dto';

@Controller('facilities')
export class FacilitiesController {
  constructor(private readonly facilitiesService: FacilitiesService) {}

  @Post('migrate/regenerate-slugs')
  async regenerateSlugs() {
    return await this.facilitiesService.regenerateMissingSlugs();
  }

  @Post()
  create(@Body() dto: CreateFacilitiesDto) {
    return this.facilitiesService.create(dto);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.facilitiesService.findBySlug(slug);
  }

  @Get(':slugOrId')
  async findOne(@Param('slugOrId') slugOrId: string) {
    return await this.facilitiesService.findOneBySlugOrId(slugOrId);
  }

  @Get()
  findAll(@Query('published') published?: string) {
    const publishedOnly = published === 'true';
    return this.facilitiesService.findAll(publishedOnly);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFacilitiesDto) {
    return this.facilitiesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facilitiesService.remove(id);
  }
}
