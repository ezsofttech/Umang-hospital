import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Subcategory, SubcategorySchema } from './subcategory.schema';
import { Category, CategorySchema } from '../category/category.schema';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryController } from './subcategory.controller';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subcategory.name, schema: SubcategorySchema },
      { name: Category.name, schema: CategorySchema },
    ]),
    UploadModule,
  ],
  controllers: [SubcategoryController],
  providers: [SubcategoryService],
})
export class SubcategoryModule {}
