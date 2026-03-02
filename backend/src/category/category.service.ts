import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UploadService } from '../upload/upload.service';
import { generateSlug, generateUniqueSlug } from '../utils/slug';

const MOCK_CATEGORIES = [
  {
    title: 'IVF & Fertility Treatment',
    description: 'Advanced IVF, IUI & Fertility Solutions For Couples Dreaming Of Parenthood',
    image: '/images/ivf-img.svg',
  },
  {
    title: 'Gynecology & Obstetrics',
    description: 'Comprehensive Women\'s Health Care Including Pregnancy, Childbirth And Postpartum Support',
    image: '/images/gynecology-img.svg',
  },
  {
    title: 'Plastic Surgery',
    description: 'Expert Cosmetic And Reconstructive Procedures For Your Confidence And Beauty',
    image: '/images/plastic-surgery-img.svg',
  },
  {
    title: 'Hair Transplant',
    description: 'Advanced Hair Restoration With Natural Results For Lasting Confidence.',
    image: '/images/hair-transplant-img.svg',
  },
];

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    private readonly uploadService: UploadService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const slug = createCategoryDto.slug || await generateUniqueSlug(createCategoryDto.title, this.categoryModel);
    const newCategory = new this.categoryModel({
      ...createCategoryDto,
      slug,
    });
    return await newCategory.save();
  }

  async findAll() {
    const count = await this.categoryModel.countDocuments({});
    if (count === 0) {
      // Seed mock data if no categories exist
      const categoriesWithSlugs = MOCK_CATEGORIES.map(cat => ({
        ...cat,
        slug: generateSlug(cat.title),
      }));
      return await this.categoryModel.insertMany(categoriesWithSlugs);
    }
    return await this.categoryModel.find({ active: true });
  }

  async findBySlug(slug: string) {
    try {
      return await this.categoryModel.findOne({ slug }).catch(() => null);
    } catch (error) {
      console.error('Error in findBySlug:', error);
      return null;
    }
  }

  async findOne(id: string) {
    // Return null if id is not provided
    if (!id || id === 'undefined') {
      return null;
    }
    
    try {
      // Try to find by ID first (in case it's a valid MongoDB ObjectId)
      let result = await this.categoryModel.findById(id).catch(() => null);
      if (result) {
        return result;
      }
      
      // If not found by ID, try to find by slug
      result = await this.categoryModel.findOne({ slug: id }).catch(() => null);
      return result;
    } catch (error) {
      console.error('Error in findOne:', error);
      return null;
    }
  }

  async update(id: string, updateCategoryDto: CreateCategoryDto) {
    const updateData = { ...updateCategoryDto };
    if (updateCategoryDto.slug) {
      updateData['slug'] = updateCategoryDto.slug;
    } else if (updateCategoryDto.title) {
      updateData['slug'] = await generateUniqueSlug(updateCategoryDto.title, this.categoryModel, id);
    }
    return await this.categoryModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async remove(id: string) {
    const result = await this.categoryModel.findByIdAndDelete(id);
    if (result?.image) await this.uploadService.deleteImage(result.image);
    return result;
  }

  async regenerateMissingSlugs() {
    // Find all categories that are missing slugs
    const categoriesWithoutSlug = await this.categoryModel.find({
      $or: [{ slug: { $exists: false } }, { slug: null }, { slug: '' }],
    });

    if (categoriesWithoutSlug.length === 0) {
      return {
        message: '✓ All categories already have slugs',
        updated: 0,
        results: [],
      };
    }

    const results = [];
    for (const category of categoriesWithoutSlug) {
      const slug = generateSlug(category.title);
      const updated = await this.categoryModel.findByIdAndUpdate(
        category._id,
        { slug },
        { new: true },
      );
      results.push({
        id: category._id,
        title: category.title,
        slug: slug,
      });
    }

    return {
      message: `✓ Successfully updated ${results.length} categories with missing slugs`,
      updated: results.length,
      results,
    };
  }
}
