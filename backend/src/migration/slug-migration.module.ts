import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SlugMigrationService } from './slug-migration.service';
import { Category, CategorySchema } from '../category/category.schema';
import { Subcategory, SubcategorySchema } from '../subcategory/subcategory.schema';
import { Blog, BlogSchema } from '../blog/blog.schema';
import { Doctor, DoctorSchema } from '../doctor/doctor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Subcategory.name, schema: SubcategorySchema },
      { name: Blog.name, schema: BlogSchema },
      { name: Doctor.name, schema: DoctorSchema },
    ]),
  ],
  providers: [SlugMigrationService],
  exports: [SlugMigrationService],
})
export class SlugMigrationModule {}
