import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SlugMigrationService } from './slug-migration.service';
import { Category, CategorySchema } from '../category/category.schema';
import { Subcategory, SubcategorySchema } from '../subcategory/subcategory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Subcategory.name, schema: SubcategorySchema },
    ]),
  ],
  providers: [SlugMigrationService],
  exports: [SlugMigrationService],
})
export class SlugMigrationModule {}
