import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from './doctor.schema';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { UploadService } from '../upload/upload.service';
import { generateSlug, generateUniqueSlug } from '../utils/slug';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
    private readonly uploadService: UploadService,
  ) {}

  async create(dto: CreateDoctorDto) {
    const slug = dto.slug || await generateUniqueSlug(dto.name, this.doctorModel);
    const doc = await this.doctorModel.create({ ...dto, slug });
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

  async findOneBySlugOrId(slugOrId: string) {
    // Return error if not provided
    if (!slugOrId || slugOrId === 'undefined') {
      throw new NotFoundException('Doctor not found');
    }

    try {
      // Try to find by ID first (in case it's a valid MongoDB ObjectId)
      let doc = await this.doctorModel.findById(slugOrId).lean().exec().catch(() => null);
      if (doc) {
        return doc;
      }

      // If not found by ID, try to find by slug
      doc = await this.doctorModel.findOne({ slug: slugOrId }).lean().exec().catch(() => null);
      if (doc) {
        return doc;
      }

      // Not found
      throw new NotFoundException('Doctor not found');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error in findOneBySlugOrId:', error);
      throw new NotFoundException('Doctor not found');
    }
  }

  async update(id: string, dto: UpdateDoctorDto) {
    const updateData = { ...dto };
    if (dto.name) {
      updateData['slug'] = dto.slug || await generateUniqueSlug(dto.name, this.doctorModel, id);
    }
    const doc = await this.doctorModel
      .findByIdAndUpdate(id, { $set: updateData }, { new: true })
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

  async regenerateMissingSlugs() {
    // Find all doctors that are missing slugs
    const doctorsWithoutSlug = await this.doctorModel.find({
      $or: [{ slug: { $exists: false } }, { slug: null }, { slug: '' }],
    });

    if (doctorsWithoutSlug.length === 0) {
      return {
        message: '✓ All doctors already have slugs',
        updated: 0,
        results: [],
      };
    }

    const results = [];
    for (const doctor of doctorsWithoutSlug) {
      const slug = generateSlug(doctor.name);
      const updated = await this.doctorModel.findByIdAndUpdate(
        doctor._id,
        { slug },
        { new: true },
      );
      results.push({
        id: doctor._id,
        name: doctor.name,
        slug: slug,
      });
    }

    return {
      message: `✓ Successfully updated ${results.length} doctors with missing slugs`,
      updated: results.length,
      results,
    };
  }
}
