import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';
import { MessageModule } from './message/message.module';
import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { AuthModule } from './auth/auth.module';
import { DoctorModule } from './doctor/doctor.module';
import { UploadModule } from './upload/upload.module';
import { SlugMigrationModule } from './migration/slug-migration.module';
import { SlugMigrationService } from './migration/slug-migration.service';

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
    SlugMigrationModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private slugMigrationService: SlugMigrationService) {}

  async onModuleInit() {
    // Run slug migration on app startup
    await this.slugMigrationService.runMigration();
  }
}
