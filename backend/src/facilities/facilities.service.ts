import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Facilities, FacilitiesDocument } from './facilities.schema';
import { CreateFacilitiesDto } from './dto/create-facilities.dto';
import { UpdateFacilitiesDto } from './dto/update-facilities.dto';
import { toResponse, toResponseList } from '../utils/mongo';
import { UploadService } from '../upload/upload.service';
import { generateSlug, generateUniqueSlug } from '../utils/slug';

@Injectable()
export class FacilitiesService {
  constructor(
    @InjectModel(Facilities.name) private facilitiesModel: Model<FacilitiesDocument>,
    private readonly uploadService: UploadService,
  ) {}

  async create(dto: CreateFacilitiesDto) {
    const slug = dto.slug || await generateUniqueSlug(dto.title, this.facilitiesModel);
    const doc = await this.facilitiesModel.create({ ...dto, slug });
    return toResponse(doc.toObject());
  }

  async findAll(publishedOnly?: boolean) {
    const query = publishedOnly ? { published: true } : {};
    const docs = await this.facilitiesModel.find(query).sort({ createdAt: -1 }).lean().exec();
    return toResponseList(docs);
  }

  async findOne(id: string) {
    try {
      const doc = await this.facilitiesModel.findById(id).lean().exec();
      if (!doc) throw new NotFoundException('Facilities not found');
      return toResponse(doc);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error in findOne:', error);
      throw new NotFoundException('Facilities not found');
    }
  }

  async findBySlug(slug: string) {
    const doc = await this.facilitiesModel.findOne({ slug, published: true }).lean().exec();
    return doc ? toResponse(doc) : null;
  }

  async findOneBySlugOrId(slugOrId: string) {
    // Return null if not provided
    if (!slugOrId || slugOrId === 'undefined') {
      throw new NotFoundException('Facilities not found');
    }

    try {
      // Try to find by ID first (in case it's a valid MongoDB ObjectId)
      let doc = await this.facilitiesModel.findById(slugOrId).lean().exec().catch(() => null);
      if (doc) {
        return toResponse(doc);
      }

      // If not found by ID, try to find by slug
      doc = await this.facilitiesModel.findOne({ slug: slugOrId, published: true }).lean().exec().catch(() => null);
      if (doc) {
        return toResponse(doc);
      }

      // Not found
      throw new NotFoundException('Facilities not found');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error in findOneBySlugOrId:', error);
      throw new NotFoundException('Facilities not found');
    }
  }

  async update(id: string, dto: UpdateFacilitiesDto) {
    const updateData = { ...dto };
    if (dto.title) {
      updateData['slug'] = dto.slug || await generateUniqueSlug(dto.title, this.facilitiesModel, id);
    }
    const doc = await this.facilitiesModel
      .findByIdAndUpdate(id, { $set: updateData }, { new: true })
      .lean()
      .exec();
    if (!doc) throw new NotFoundException('Facilities not found');
    return toResponse(doc);
  }

  async remove(id: string) {
    const result = await this.facilitiesModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Facilities not found');
    if (result.image) await this.uploadService.deleteImage(result.image);
    return toResponse(result.toObject());
  }

  async regenerateMissingSlugs() {
    // Find all facilities that are missing slugs
    const facilitiesWithoutSlug = await this.facilitiesModel.find({
      $or: [{ slug: { $exists: false } }, { slug: null }, { slug: '' }],
    });

    if (facilitiesWithoutSlug.length === 0) {
      return {
        message: '✓ All facilities already have slugs',
        updated: 0,
        results: [],
      };
    }

    const results = [];
    for (const facility of facilitiesWithoutSlug) {
      const slug = generateSlug(facility.title);
      const updated = await this.facilitiesModel.findByIdAndUpdate(
        facility._id,
        { slug },
        { new: true },
      );
      if (updated) results.push(updated);
    }

    return {
      message: `✓ Updated ${results.length} facilities with slugs`,
      updated: results.length,
      results: results.filter(r => !!r).map(toResponse),
    };
  }
}
