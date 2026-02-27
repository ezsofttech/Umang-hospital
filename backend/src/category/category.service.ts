import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UploadService } from '../upload/upload.service';

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
    const newCategory = new this.categoryModel(createCategoryDto);
    return await newCategory.save();
  }

  async findAll() {
    const count = await this.categoryModel.countDocuments({});
    if (count === 0) {
      // Seed mock data if no categories exist
      return await this.categoryModel.insertMany(MOCK_CATEGORIES);
    }
    return await this.categoryModel.find({ active: true });
  }

  async findOne(id: string) {
    return await this.categoryModel.findById(id);
  }

  async update(id: string, updateCategoryDto: CreateCategoryDto) {
    return await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true });
  }

  async remove(id: string) {
    const result = await this.categoryModel.findByIdAndDelete(id);
    if (result?.image) await this.uploadService.deleteImage(result.image);
    return result;
  }
}
