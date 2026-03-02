import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { toResponse, toResponseList } from '../utils/mongo';
import { UploadService } from '../upload/upload.service';
import { generateSlug, generateUniqueSlug } from '../utils/slug';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    private readonly uploadService: UploadService,
  ) {}

  async create(dto: CreateBlogDto) {
    const slug = dto.slug || await generateUniqueSlug(dto.title, this.blogModel);
    const doc = await this.blogModel.create({ ...dto, slug });
    return toResponse(doc.toObject());
  }

  async findAll(publishedOnly?: boolean) {
    const query = publishedOnly ? { published: true } : {};
    const docs = await this.blogModel.find(query).sort({ createdAt: -1 }).lean().exec();
    return toResponseList(docs);
  }

  async findOne(id: string) {
    try {
      const doc = await this.blogModel.findById(id).lean().exec();
      if (!doc) throw new NotFoundException('Blog not found');
      return toResponse(doc);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error in findOne:', error);
      throw new NotFoundException('Blog not found');
    }
  }

  async findBySlug(slug: string) {
    const doc = await this.blogModel.findOne({ slug, published: true }).lean().exec();
    return doc ? toResponse(doc) : null;
  }

  async findOneBySlugOrId(slugOrId: string) {
    // Return null if not provided
    if (!slugOrId || slugOrId === 'undefined') {
      throw new NotFoundException('Blog not found');
    }

    try {
      // Try to find by ID first (in case it's a valid MongoDB ObjectId)
      let doc = await this.blogModel.findById(slugOrId).lean().exec().catch(() => null);
      if (doc) {
        return toResponse(doc);
      }

      // If not found by ID, try to find by slug
      doc = await this.blogModel.findOne({ slug: slugOrId, published: true }).lean().exec().catch(() => null);
      if (doc) {
        return toResponse(doc);
      }

      // Not found
      throw new NotFoundException('Blog not found');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error in findOneBySlugOrId:', error);
      throw new NotFoundException('Blog not found');
    }
  }

  async update(id: string, dto: UpdateBlogDto) {
    const updateData = { ...dto };
    if (dto.title) {
      updateData['slug'] = dto.slug || await generateUniqueSlug(dto.title, this.blogModel, id);
    }
    const doc = await this.blogModel
      .findByIdAndUpdate(id, { $set: updateData }, { new: true })
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

  async regenerateMissingSlugs() {
    // Find all blogs that are missing slugs
    const blogsWithoutSlug = await this.blogModel.find({
      $or: [{ slug: { $exists: false } }, { slug: null }, { slug: '' }],
    });

    if (blogsWithoutSlug.length === 0) {
      return {
        message: '✓ All blogs already have slugs',
        updated: 0,
        results: [],
      };
    }

    const results = [];
    for (const blog of blogsWithoutSlug) {
      const slug = generateSlug(blog.title);
      const updated = await this.blogModel.findByIdAndUpdate(
        blog._id,
        { slug },
        { new: true },
      );
      results.push({
        id: blog._id,
        title: blog.title,
        slug: slug,
      });
    }

    return {
      message: `✓ Successfully updated ${results.length} blogs with missing slugs`,
      updated: results.length,
      results,
    };
  }
}
