import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from './doctor.schema';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
    private readonly uploadService: UploadService,
  ) {}

  async create(dto: CreateDoctorDto) {
    const doc = await this.doctorModel.create(dto);
    return doc.toObject();
  }

  async findAll(activeOnly = false) {
    const query = activeOnly ? { active: true } : {};
    return this.doctorModel.find(query).sort({ createdAt: -1 }).lean().exec();
  }

  async findOne(id: string) {
    const doc = await this.doctorModel.findById(id).lean().exec();
    if (!doc) throw new NotFoundException('Doctor not found');
    return doc;
  }

  async findBySlug(slug: string) {
    const doc = await this.doctorModel.findOne({ slug }).lean().exec();
    if (!doc) throw new NotFoundException('Doctor not found');
    return doc;
  }

  async update(id: string, dto: UpdateDoctorDto) {
    const doc = await this.doctorModel
      .findByIdAndUpdate(id, { $set: dto }, { new: true })
      .lean()
      .exec();
    if (!doc) throw new NotFoundException('Doctor not found');
    return doc;
  }

  async remove(id: string) {
    const result = await this.doctorModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Doctor not found');
    if (result.image) await this.uploadService.deleteImage(result.image);
    return { deleted: true };
  }
}
