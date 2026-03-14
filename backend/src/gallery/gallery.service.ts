import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gallery, GalleryDocument } from './gallery.schema';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { toResponse, toResponseList } from '../utils/mongo';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel(Gallery.name) private galleryModel: Model<GalleryDocument>,
    private readonly uploadService: UploadService,
  ) {}

  async create(dto: CreateGalleryDto) {
    const doc = await this.galleryModel.create(dto);
    return toResponse(doc.toObject());
  }

  async findAll(publishedOnly?: boolean) {
    const query = publishedOnly ? { published: true } : {};
    const docs = await this.galleryModel
      .find(query)
      .sort({ order: 1, createdAt: -1 })
      .lean()
      .exec();
    return toResponseList(docs);
  }

  async findOne(id: string) {
    try {
      const doc = await this.galleryModel.findById(id).lean().exec();
      if (!doc) throw new NotFoundException('Gallery item not found');
      return toResponse(doc);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new NotFoundException('Gallery item not found');
    }
  }

  async update(id: string, dto: UpdateGalleryDto) {
    const doc = await this.galleryModel
      .findByIdAndUpdate(id, { $set: dto }, { new: true })
      .lean()
      .exec();
    if (!doc) throw new NotFoundException('Gallery item not found');
    return toResponse(doc);
  }

  async remove(id: string) {
    const result = await this.galleryModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Gallery item not found');
    if (result.image) await this.uploadService.deleteImage(result.image);
    return toResponse(result.toObject());
  }
}
