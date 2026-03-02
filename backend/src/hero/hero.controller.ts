import { Controller, Get, Post, Body, Param, Put, HttpException, HttpStatus } from '@nestjs/common';
import { HeroService } from './hero.service';
import { CreateHeroDto } from './dto/create-hero.dto';

@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Post()
  async create(@Body() createHeroDto: CreateHeroDto) {
    try {
      console.log('POST /hero - Creating hero with data:', createHeroDto);
      const result = await this.heroService.create(createHeroDto);
      console.log('POST /hero - Created successfully:', result);
      return result;
    } catch (error) {
      console.error('POST /hero - Error:', error);
      throw new HttpException('Failed to create hero', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      console.log('GET /hero - Fetching all heroes');
      const result = await this.heroService.findAll();
      console.log('GET /hero - Result:', result);
      return result;
    } catch (error) {
      console.error('GET /hero - Error:', error);
      throw new HttpException('Failed to fetch hero', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('active')
  async getActive() {
    try {
      console.log('GET /hero/active - Fetching active hero');
      const result = await this.heroService.getActive();
      console.log('GET /hero/active - Result:', result);
      return result;
    } catch (error) {
      console.error('GET /hero/active - Error:', error);
      throw new HttpException('Failed to fetch active hero', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      console.log(`GET /hero/:id - Fetching hero with ID: ${id}`);
      const result = await this.heroService.findOne(id);
      console.log(`GET /hero/:id - Result:`, result);
      return result;
    } catch (error) {
      console.error(`GET /hero/:id - Error:`, error);
      throw new HttpException('Hero not found', HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateHeroDto: CreateHeroDto) {
    try {
      console.log(`\n========== PUT /hero/:id ==========`);
      console.log(`Raw Request Param ID: ${id}`);
      console.log(`Raw Request Body:`, JSON.stringify(updateHeroDto, null, 2));
      console.log(`typeof updateHeroDto:`, typeof updateHeroDto);
      console.log(`updateHeroDto keys:`, Object.keys(updateHeroDto));
      console.log(`updateHeroDto instanceof:`, updateHeroDto.constructor.name);
      
      // Log each field explicitly
      console.log(`Field - title:`, typeof updateHeroDto.title, `| value:`, updateHeroDto.title);
      console.log(`Field - description:`, typeof updateHeroDto.description, `| value:`, updateHeroDto.description?.substring(0, 50));
      console.log(`Field - ctaButtonText:`, typeof updateHeroDto.ctaButtonText, `| value:`, updateHeroDto.ctaButtonText);
      
      const updated = await this.heroService.update(id, updateHeroDto);
      console.log(`Returning updated hero:`, JSON.stringify(updated, null, 2));
      console.log(`========== END PUT /hero/:id ==========\n`);
      return updated;
    } catch (error) {
      console.error('PUT /hero/:id - Error:', error);
      throw new HttpException('Failed to update hero', HttpStatus.BAD_REQUEST);
    }
  }
}
