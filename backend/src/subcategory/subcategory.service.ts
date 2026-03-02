import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subcategory } from './subcategory.schema';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { Category } from '../category/category.schema';
import { UploadService } from '../upload/upload.service';
import { generateSlug } from '../utils/slug';

// Mock subcategories template
const createMockSubcategories = (categories: any[]) => {
  const categoryMap = new Map();
  categories.forEach(cat => {
    categoryMap.set(cat.title, cat._id.toString());
  });

  return [
    {
      title: 'IVF Treatment',
      description: 'In vitro fertilization treatment',
      explanation: 'IVF is a fertility treatment where eggs are retrieved and fertilized outside the body. The embryo is then transferred to the uterus. Our advanced IVF program has high success rates with experienced specialists and state-of-the-art laboratories.',
      image: '/images/ivf-treatment.svg',
      categoryId: categoryMap.get('IVF & Fertility Treatment'),
    },
    {
      title: 'IUI Treatment',
      description: 'Intrauterine insemination',
      explanation: 'IUI is a less invasive fertility treatment where prepared sperm is directly inserted into the uterus. This treatment is suitable for couples with mild male factor infertility or unexplained infertility.',
      image: '/images/iui-treatment.svg',
      categoryId: categoryMap.get('IVF & Fertility Treatment'),
    },
    {
      title: 'Egg Freezing',
      description: 'Preserve your fertility',
      explanation: 'Egg freezing allows women to preserve their eggs for future use. This is ideal for women who want to delay parenthood or are undergoing medical treatments. Our advanced cryopreservation techniques ensure high survival and fertilization rates.',
      image: '/images/egg-freezing.svg',
      categoryId: categoryMap.get('IVF & Fertility Treatment'),
    },
    {
      title: 'Prenatal Care',
      description: 'Complete pregnancy monitoring',
      explanation: 'Our comprehensive prenatal care includes regular check-ups, ultrasounds, and screening tests. We provide personalized care throughout your pregnancy to ensure the health of both mother and baby.',
      image: '/images/prenatal-care.svg',
      categoryId: categoryMap.get('Gynecology & Obstetrics'),
    },
    {
      title: 'Labor & Delivery',
      description: 'Safe childbirth experience',
      explanation: 'We offer safe and supportive labor and delivery services with experienced obstetric team. Our modern delivery suites and advanced neonatal care ensure the best outcomes for mother and newborn.',
      image: '/images/labor-delivery.svg',
      categoryId: categoryMap.get('Gynecology & Obstetrics'),
    },
    {
      title: 'Postpartum Care',
      description: 'Recovery and support after birth',
      explanation: 'Comprehensive postpartum care including mother and baby health checks, breastfeeding support, and emotional counseling. We ensure a smooth recovery and bonding for new families.',
      image: '/images/postpartum-care.svg',
      categoryId: categoryMap.get('Gynecology & Obstetrics'),
    },
    {
      title: 'Rhinoplasty',
      description: 'Nose reshaping surgery',
      explanation: 'Our expert plastic surgeons perform nose reshaping for both aesthetic and functional improvements. We use latest techniques to achieve natural-looking results with minimal downtime.',
      image: '/images/rhinoplasty.svg',
      categoryId: categoryMap.get('Plastic Surgery'),
    },
    {
      title: 'Liposuction',
      description: 'Body contouring procedure',
      explanation: 'Advanced liposuction techniques to remove stubborn fat deposits and contour your body. We use minimally invasive methods with quick recovery and beautiful results.',
      image: '/images/liposuction.svg',
      categoryId: categoryMap.get('Plastic Surgery'),
    },
    {
      title: 'Breast Surgery',
      description: 'Breast augmentation and reconstruction',
      explanation: 'Whether for augmentation, reduction, or reconstruction, our surgeons provide personalized breast surgery solutions. We focus on natural results and patient satisfaction.',
      image: '/images/breast-surgery.svg',
      categoryId: categoryMap.get('Plastic Surgery'),
    },
    {
      title: 'Hair Transplant FUE',
      description: 'Follicular Unit Extraction',
      explanation: 'FUE is a minimally invasive hair transplant technique where individual hair follicles are extracted and transplanted. No stitches, faster recovery, and natural-looking results.',
      image: '/images/fue-transplant.svg',
      categoryId: categoryMap.get('Hair Transplant'),
    },
    {
      title: 'Hair Transplant FUT',
      description: 'Follicular Unit Transplantation',
      explanation: 'FUT involves removing a strip of scalp and transplanting individual follicles. Ideal for patients needing large hair grafts with cost-effective treatment.',
      image: '/images/fut-transplant.svg',
      categoryId: categoryMap.get('Hair Transplant'),
    },
    {
      title: 'PRP Hair Treatment',
      description: 'Platelet Rich Plasma therapy',
      explanation: 'PRP therapy uses concentrated platelets from your blood to stimulate hair growth. This non-surgical treatment is effective for hair loss and can be combined with other treatments.',
      image: '/images/prp-treatment.svg',
      categoryId: categoryMap.get('Hair Transplant'),
    },
  ].filter(sub => sub.categoryId); // Only include subcategories with valid category IDs
};

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectModel(Subcategory.name) private subcategoryModel: Model<Subcategory>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    private readonly uploadService: UploadService,
  ) {}

  async create(createSubcategoryDto: CreateSubcategoryDto) {
    const slug = generateSlug(createSubcategoryDto.title);
    const newSubcategory = new this.subcategoryModel({
      ...createSubcategoryDto,
      slug,
    });
    return await newSubcategory.save();
  }

  async findAll() {
    const count = await this.subcategoryModel.countDocuments({});
    if (count === 0) {
      // Get existing categories or seed them first
      let categories = await this.categoryModel.find({});
      if (categories.length === 0) {
        // If no categories exist, this shouldn't happen normally, but return empty
        return [];
      }
      
      // Seed mock subcategories with actual category IDs
      const mockData = createMockSubcategories(categories);
      if (mockData.length > 0) {
        const mockDataWithSlugs = mockData.map(item => ({
          ...item,
          slug: generateSlug(item.title),
        }));
        return await this.subcategoryModel.insertMany(mockDataWithSlugs);
      }
      return [];
    }
    return await this.subcategoryModel.find({ active: true });
  }

  async findByCategory(categoryId: string) {
    // Return empty array if categoryId is not provided
    if (!categoryId || categoryId === 'undefined') {
      return [];
    }
    
    // Try to find category by ID, then by slug to get the actual ID
    let category = await this.categoryModel.findById(categoryId).catch(() => null);
    if (!category) {
      category = await this.categoryModel.findOne({ slug: categoryId });
    }
    
    if (!category) {
      return [];
    }

    return await this.subcategoryModel.find({ categoryId: category._id, active: true });
  }

  async findOne(id: string) {
    // Return null if id is not provided
    if (!id || id === 'undefined') {
      return null;
    }
    
    try {
      // Try to find by ID first (in case it's a valid MongoDB ObjectId)
      let result = await this.subcategoryModel.findById(id).catch(() => null);
      if (result) {
        return result;
      }
      
      // If not found by ID, try to find by slug
      result = await this.subcategoryModel.findOne({ slug: id }).catch(() => null);
      return result;
    } catch (error) {
      console.error('Error in findOne:', error);
      return null;
    }
  }

  async update(id: string, updateSubcategoryDto: CreateSubcategoryDto) {
    const updateData = { ...updateSubcategoryDto };
    if (updateSubcategoryDto.title) {
      updateData['slug'] = generateSlug(updateSubcategoryDto.title);
    }
    return await this.subcategoryModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async remove(id: string) {
    const result = await this.subcategoryModel.findByIdAndDelete(id);
    if (result?.image) await this.uploadService.deleteImage(result.image);
    return result;
  }

  async regenerateMissingSlugs() {
    // Find all subcategories that are missing slugs
    const subcategoriesWithoutSlug = await this.subcategoryModel.find({
      $or: [{ slug: { $exists: false } }, { slug: null }, { slug: '' }],
    });

    if (subcategoriesWithoutSlug.length === 0) {
      return {
        message: '✓ All subcategories already have slugs',
        updated: 0,
        results: [],
      };
    }

    const results = [];
    for (const subcategory of subcategoriesWithoutSlug) {
      const slug = generateSlug(subcategory.title);
      const updated = await this.subcategoryModel.findByIdAndUpdate(
        subcategory._id,
        { slug },
        { new: true },
      );
      results.push({
        id: subcategory._id,
        title: subcategory.title,
        slug: slug,
      });
    }

    return {
      message: `✓ Successfully updated ${results.length} subcategories with missing slugs`,
      updated: results.length,
      results,
    };
  }
}
