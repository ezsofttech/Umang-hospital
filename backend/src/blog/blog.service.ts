import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { toResponse, toResponseList } from '../utils/mongo';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    private readonly uploadService: UploadService,
  ) {}

  async create(dto: CreateBlogDto) {
    const doc = await this.blogModel.create(dto);
    return toResponse(doc.toObject());
  }

  async findAll(publishedOnly?: boolean) {
    const query = publishedOnly ? { published: true } : {};
    const docs = await this.blogModel.find(query).sort({ createdAt: -1 }).lean().exec();
    return toResponseList(docs);
  }

  async findOne(id: string) {
    const doc = await this.blogModel.findById(id).lean().exec();
    if (!doc) throw new NotFoundException('Blog not found');
    return toResponse(doc);
  }

  async findBySlug(slug: string) {
    const doc = await this.blogModel.findOne({ slug, published: true }).lean().exec();
    return doc ? toResponse(doc) : null;
  }

  async update(id: string, dto: UpdateBlogDto) {
    const doc = await this.blogModel
      .findByIdAndUpdate(id, { $set: dto }, { new: true })
      .lean()
      .exec();
    if (!doc) throw new NotFoundException('Blog not found');
    return toResponse(doc);
  }

  async remove(id: string) {
    const result = await this.blogModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Blog not found');
    if (result.image) await this.uploadService.deleteImage(result.image);
    return toResponse(result.toObject());
  }
}
