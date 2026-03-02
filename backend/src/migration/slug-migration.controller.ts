import { Controller, Post, UseGuards, Logger } from '@nestjs/common';
import { SlugMigrationService } from './slug-migration.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('migration')
@UseGuards(JwtAuthGuard, RoleGuard)
export class SlugMigrationController {
  private readonly logger = new Logger(SlugMigrationController.name);

  constructor(private readonly slugMigrationService: SlugMigrationService) {}

  @Post('slugs/run')
  @Roles('admin')
  async runAllMigrations() {
    this.logger.log('Admin triggered slug migration');
    await this.slugMigrationService.runMigration();
    return {
      success: true,
      message: 'Slug migration completed successfully',
    };
  }

  @Post('slugs/categories')
  @Roles('admin')
  async migrateCategories() {
    this.logger.log('Admin triggered category slug migration');
    await this.slugMigrationService.migrateCategory();
    return {
      success: true,
      message: 'Category slug migration completed',
    };
  }

  @Post('slugs/subcategories')
  @Roles('admin')
  async migrateSubcategories() {
    this.logger.log('Admin triggered subcategory slug migration');
    await this.slugMigrationService.migrateSubcategory();
    return {
      success: true,
      message: 'Subcategory slug migration completed',
    };
  }

  @Post('slugs/blogs')
  @Roles('admin')
  async migrateBlogs() {
    this.logger.log('Admin triggered blog slug migration');
    await this.slugMigrationService.migrateBlog();
    return {
      success: true,
      message: 'Blog slug migration completed',
    };
  }

  @Post('slugs/doctors')
  @Roles('admin')
  async migrateDoctor() {
    this.logger.log('Admin triggered doctor slug migration');
    await this.slugMigrationService.migrateDoctor();
    return {
      success: true,
      message: 'Doctor slug migration completed',
    };
  }

  @Post('slugs/users')
  @Roles('admin')
  async migrateUsers() {
    this.logger.log('Admin triggered user slug migration');
    await this.slugMigrationService.migrateUser();
    return {
      success: true,
      message: 'User slug migration completed',
    };
  }
}
