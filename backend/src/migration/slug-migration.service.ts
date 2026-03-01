import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../category/category.schema';
import { Subcategory } from '../subcategory/subcategory.schema';
import { generateSlug } from '../utils/slug';

@Injectable()
export class SlugMigrationService {
  private readonly logger = new Logger(SlugMigrationService.name);

  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Subcategory.name) private subcategoryModel: Model<Subcategory>,
  ) {}

  async migrateCategory() {
    try {
      // Find all categories without slug
      const categoriesWithoutSlug = await this.categoryModel.find({
        $or: [{ slug: { $exists: false } }, { slug: null }, { slug: '' }],
      });

      if (categoriesWithoutSlug.length === 0) {
        this.logger.log('✓ All categories already have slugs');
        return;
      }

      this.logger.log(
        `Migrating ${categoriesWithoutSlug.length} categories with missing slugs...`,
      );

      for (const category of categoriesWithoutSlug) {
        const slug = generateSlug(category.title);
        await this.categoryModel.findByIdAndUpdate(
          category._id,
          { slug },
          { new: true },
        );
        this.logger.log(`✓ Updated category: ${category.title} -> ${slug}`);
      }

      this.logger.log('✓ Category migration completed');
    } catch (error) {
      this.logger.error('Category migration failed:', error);
    }
  }

  async migrateSubcategory() {
    try {
      // Find all subcategories without slug
      const subcategoriesWithoutSlug = await this.subcategoryModel.find({
        $or: [{ slug: { $exists: false } }, { slug: null }, { slug: '' }],
      });

      if (subcategoriesWithoutSlug.length === 0) {
        this.logger.log('✓ All subcategories already have slugs');
        return;
      }

      this.logger.log(
        `Migrating ${subcategoriesWithoutSlug.length} subcategories with missing slugs...`,
      );

      for (const subcategory of subcategoriesWithoutSlug) {
        const slug = generateSlug(subcategory.title);
        await this.subcategoryModel.findByIdAndUpdate(
          subcategory._id,
          { slug },
          { new: true },
        );
        this.logger.log(
          `✓ Updated subcategory: ${subcategory.title} -> ${slug}`,
        );
      }

      this.logger.log('✓ Subcategory migration completed');
    } catch (error) {
      this.logger.error('Subcategory migration failed:', error);
    }
  }

  async runMigration() {
    this.logger.log('Starting slug migration...');
    await this.migrateCategory();
    await this.migrateSubcategory();
    this.logger.log('✓ Slug migration finished');
  }
}
