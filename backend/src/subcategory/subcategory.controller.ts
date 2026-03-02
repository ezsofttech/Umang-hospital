import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';

@Controller('subcategories')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Post('migrate/regenerate-slugs')
  async regenerateSlugs() {
    return await this.subcategoryService.regenerateMissingSlugs();
  }

  @Post()
  async create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return await this.subcategoryService.create(createSubcategoryDto);
  }

  @Get('category/:categoryId')
  async findByCategory(@Param('categoryId') categoryId: string) {
    return await this.subcategoryService.findByCategory(categoryId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.subcategoryService.findOne(id);
  }

  @Get()
  async findAll() {
    return await this.subcategoryService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateSubcategoryDto: CreateSubcategoryDto) {
    return await this.subcategoryService.update(id, updateSubcategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.subcategoryService.remove(id);
  }
}
