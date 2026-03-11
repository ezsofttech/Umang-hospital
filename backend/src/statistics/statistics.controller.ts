import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { CreateStatisticsDto } from './dto/create-statistics.dto';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  // GET endpoints must come before :id parameter
  @Get()
  async getAll() {
    try {
      console.log('GET /statistics - Fetching all statistics');
      const result = await this.statisticsService.getAll();
      console.log('GET /statistics - Success, returned:', result?.length, 'statistics');
      return result;
    } catch (error) {
      console.error('GET /statistics - Error:', error);
      throw new HttpException('Failed to fetch statistics', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      console.log('GET /statistics/:id - Fetching statistic with id:', id);
      const result = await this.statisticsService.findOne(id);
      if (!result) {
        throw new HttpException('Statistic not found', HttpStatus.NOT_FOUND);
      }
      console.log('GET /statistics/:id - Found statistic:', result._id);
      return result;
    } catch (error) {
      console.error('GET /statistics/:id - Error:', error);
      throw new HttpException('Failed to fetch statistic', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async create(@Body() createStatisticsDto: CreateStatisticsDto) {
    try {
      console.log('POST /statistics - Creating statistic with data:', createStatisticsDto);
      const result = await this.statisticsService.create(createStatisticsDto);
      console.log('POST /statistics - Created successfully:', result._id);
      return result;
    } catch (error) {
      console.error('POST /statistics - Error:', error);
      throw new HttpException('Failed to create statistic', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateStatisticsDto: Partial<CreateStatisticsDto>) {
    try {
      console.log('PUT /statistics/:id - Updating statistic with id:', id);
      console.log('PUT /statistics/:id - Data:', updateStatisticsDto);
      const result = await this.statisticsService.update(id, updateStatisticsDto);
      if (!result) {
        throw new HttpException('Statistic not found', HttpStatus.NOT_FOUND);
      }
      console.log('PUT /statistics/:id - Updated successfully:', result._id);
      return result;
    } catch (error) {
      console.error('PUT /statistics/:id - Error:', error);
      throw new HttpException('Failed to update statistic', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      console.log('DELETE /statistics/:id - Deleting statistic with id:', id);
      const result = await this.statisticsService.remove(id);
      if (!result) {
        throw new HttpException('Statistic not found', HttpStatus.NOT_FOUND);
      }
      console.log('DELETE /statistics/:id - Deleted successfully');
      return result;
    } catch (error) {
      console.error('DELETE /statistics/:id - Error:', error);
      throw new HttpException('Failed to delete statistic', HttpStatus.BAD_REQUEST);
    }
  }
}

