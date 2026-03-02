import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../category/category.schema';
import { Subcategory } from '../subcategory/subcategory.schema';
import { Blog } from '../blog/blog.schema';
import { Doctor } from '../doctor/doctor.schema';
import { User } from '../user/user.schema';
import { generateSlug } from '../utils/slug';

@Injectable()
export class SlugMigrationService {
  private readonly logger = new Logger(SlugMigrationService.name);

  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Subcategory.name) private subcategoryModel: Model<Subcategory>,
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
    @InjectModel(Doctor.name) private doctorModel: Model<Doctor>,
    @InjectModel(User.name) private userModel: Model<User>,
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

  async migrateBlog() {
    try {
      // Find all blogs without slug
      const blogsWithoutSlug = await this.blogModel.find({
        $or: [{ slug: { $exists: false } }, { slug: null }, { slug: '' }],
      });

      if (blogsWithoutSlug.length === 0) {
        this.logger.log('✓ All blogs already have slugs');
        return;
      }

      this.logger.log(
        `Migrating ${blogsWithoutSlug.length} blogs with missing slugs...`,
      );

      for (const blog of blogsWithoutSlug) {
        const slug = generateSlug(blog.title);
        await this.blogModel.findByIdAndUpdate(
          blog._id,
          { slug },
          { new: true },
        );
        this.logger.log(
          `✓ Updated blog: ${blog.title} -> ${slug}`,
        );
      }

      this.logger.log('✓ Blog migration completed');
    } catch (error) {
      this.logger.error('Blog migration failed:', error);
    }
  }

  async migrateDoctor() {
    try {
      // Find all doctors without slug
      const doctorsWithoutSlug = await this.doctorModel.find({
        $or: [{ slug: { $exists: false } }, { slug: null }, { slug: '' }],
      });

      if (doctorsWithoutSlug.length === 0) {
        this.logger.log('✓ All doctors already have slugs');
        return;
      }

      this.logger.log(
        `Migrating ${doctorsWithoutSlug.length} doctors with missing slugs...`,
      );

      for (const doctor of doctorsWithoutSlug) {
        const slug = generateSlug(doctor.name);
        await this.doctorModel.findByIdAndUpdate(
          doctor._id,
          { slug },
          { new: true },
        );
        this.logger.log(
          `✓ Updated doctor: ${doctor.name} -> ${slug}`,
        );
      }

      this.logger.log('✓ Doctor migration completed');
    } catch (error) {
      this.logger.error('Doctor migration failed:', error);
    }
  }

  async migrateUser() {
    try {
      // Find all users without slug
      const usersWithoutSlug = await this.userModel.find({
        $or: [{ slug: { $exists: false } }, { slug: null }, { slug: '' }],
      });

      if (usersWithoutSlug.length === 0) {
        this.logger.log('✓ All users already have slugs');
        return;
      }

      this.logger.log(
        `Migrating ${usersWithoutSlug.length} users with missing slugs...`,
      );

      for (const user of usersWithoutSlug) {
        const slug = generateSlug(user.name);
        await this.userModel.findByIdAndUpdate(
          user._id,
          { slug },
          { new: true },
        );
        this.logger.log(
          `✓ Updated user: ${user.name} -> ${slug}`,
        );
      }

      this.logger.log('✓ User migration completed');
    } catch (error) {
      this.logger.error('User migration failed:', error);
    }
  }

  async runMigration() {
    this.logger.log('Starting slug migration...');
    await this.migrateCategory();
    await this.migrateSubcategory();
    await this.migrateBlog();
    await this.migrateDoctor();
    await this.migrateUser();
    this.logger.log('✓ Slug migration finished');
  }
}
