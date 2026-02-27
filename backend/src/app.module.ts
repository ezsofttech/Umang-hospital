import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';
import { MessageModule } from './message/message.module';
import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { AuthModule } from './auth/auth.module';
import { DoctorModule } from './doctor/doctor.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL ?? 'mongodb://localhost:27017/umang_hospital'),
    AuthModule,
    BlogModule,
    MessageModule,
    CategoryModule,
    SubcategoryModule,
    DoctorModule,
    UploadModule,
  ],
})
export class AppModule {}
