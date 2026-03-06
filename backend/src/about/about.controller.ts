import { Controller, Get, Post, Body, Param, Put, HttpException, HttpStatus } from '@nestjs/common';
import { AboutService } from './about.service';
import { CreateAboutDto } from './dto/create-about.dto';

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Post()
  async create(@Body() createAboutDto: CreateAboutDto) {
    try {
      console.log('POST /about - Creating about with data:', createAboutDto);
      const result = await this.aboutService.create(createAboutDto);
      console.log('POST /about - Created successfully:', result);
      return result;
    } catch (error) {
      console.error('POST /about - Error:', error);
      throw new HttpException('Failed to create about section', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      console.log('GET /about - Fetching about');
      const result = await this.aboutService.findAll();
      console.log('GET /about - Result:', result);
      return result;
    } catch (error) {
      console.error('GET /about - Error:', error);
      throw new HttpException('Failed to fetch about section', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      console.log(`GET /about/:id - Fetching about with ID: ${id}`);
      const result = await this.aboutService.getActive();
      console.log(`GET /about/:id - Result:`, result);
      return result;
    } catch (error) {
      console.error(`GET /about/:id - Error:`, error);
      throw new HttpException('About section not found', HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateAboutDto: CreateAboutDto) {
    try {
      console.log(`PUT /about/:id - Updating about with ID: ${id}`);
      const updated = await this.aboutService.update(id, updateAboutDto);
      console.log(`PUT /about/:id - Updated successfully:`, updated);
      return updated;
    } catch (error) {
      console.error('PUT /about/:id - Error:', error);
      throw new HttpException('Failed to update about section', HttpStatus.BAD_REQUEST);
    }
  }
}
