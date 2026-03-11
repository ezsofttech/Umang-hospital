import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Statistics } from './statistics.schema';
import { CreateStatisticsDto } from './dto/create-statistics.dto';

const DEFAULT_STATISTICS = [
  {
    label: 'National healthcare honors',
    value: '500+',
  },
  {
    label: 'People we have treated',
    value: '200+',
  },
  {
    label: 'OPD Patients Treated',
    value: '5,000+',
  },
  {
    label: 'Communities we reach out',
    value: '5,000+',
  },
  {
    label: 'Skilled staff on our team',
    value: '5,000+',
  },
];

@Injectable()
export class StatisticsService {
  constructor(@InjectModel(Statistics.name) private statisticsModel: Model<Statistics>) {}

  async create(createStatisticsDto: CreateStatisticsDto) {
    const newStatistic = new this.statisticsModel(createStatisticsDto);
    const saved = await newStatistic.save();
    return saved.toObject();
  }

  async findAll() {
    const stats = await this.statisticsModel.find().exec();

    if (stats.length === 0) {
      // Create default statistics if none exist
      await this.statisticsModel.deleteMany({});
      const newStats = await this.statisticsModel.insertMany(DEFAULT_STATISTICS);
      return newStats.map((s) => s.toObject());
    }

    return stats.map((s) => s.toObject());
  }

  async findOne(id: string) {
    const doc = await this.statisticsModel.findById(id);
    return doc ? doc.toObject() : null;
  }

  async update(id: string, updateStatisticsDto: Partial<CreateStatisticsDto>) {
    const updated = await this.statisticsModel.findByIdAndUpdate(id, updateStatisticsDto, {
      new: true,
    });
    return updated ? updated.toObject() : null;
  }

  async remove(id: string) {
    const result = await this.statisticsModel.findByIdAndDelete(id);
    return result ? result.toObject() : null;
  }

  async getAll() {
    const stats = await this.statisticsModel.find().exec();
    return stats.map((s) => s.toObject());
  }
}
