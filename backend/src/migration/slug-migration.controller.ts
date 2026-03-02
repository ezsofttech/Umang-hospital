import { Controller, Post, Logger, Body, BadRequestException } from '@nestjs/common';
import { SlugMigrationService } from './slug-migration.service';

@Controller('api/migration')
export class SlugMigrationController {
  private readonly logger = new Logger(SlugMigrationController.name);
  private readonly ADMIN_KEY = process.env.MIGRATION_ADMIN_KEY || 'admin-migration-key';

  constructor(private readonly slugMigrationService: SlugMigrationService) {}

  private validateAdminKey(key?: string) {
    if (!key || key !== this.ADMIN_KEY) {
      throw new BadRequestException('Invalid or missing admin key');
    }
  }

  @Post('seed-slugs')
  async seedSlugs(@Body() body?: { adminKey?: string }) {
    this.validateAdminKey(body?.adminKey);
    this.logger.log('Seed-slugs endpoint triggered');
    await this.slugMigrationService.runMigration();
    return {
      success: true,
      message: 'Slug migration completed successfully',
    };
  }

  @Post('slugs/run')
  async runAllMigrations(@Body() body?: { adminKey?: string }) {
    this.validateAdminKey(body?.adminKey);
    this.logger.log('Admin triggered slug migration');
    await this.slugMigrationService.runMigration();
    return {
      success: true,
      message: 'Slug migration completed successfully',
    };
  }

  @Post('slugs/categories')
  async migrateCategories(@Body() body?: { adminKey?: string }) {
    this.validateAdminKey(body?.adminKey);
    this.logger.log('Admin triggered category slug migration');
    await this.slugMigrationService.migrateCategory();
    return {
      success: true,
      message: 'Category slug migration completed',
    };
  }

  @Post('slugs/subcategories')
  async migrateSubcategories(@Body() body?: { adminKey?: string }) {
    this.validateAdminKey(body?.adminKey);
    this.logger.log('Admin triggered subcategory slug migration');
    await this.slugMigrationService.migrateSubcategory();
    return {
      success: true,
      message: 'Subcategory slug migration completed',
    };
  }

  @Post('slugs/blogs')
  async migrateBlogs(@Body() body?: { adminKey?: string }) {
    this.validateAdminKey(body?.adminKey);
    this.logger.log('Admin triggered blog slug migration');
    await this.slugMigrationService.migrateBlog();
    return {
      success: true,
      message: 'Blog slug migration completed',
    };
  }

  @Post('slugs/doctors')
  async migrateDoctor(@Body() body?: { adminKey?: string }) {
    this.validateAdminKey(body?.adminKey);
    this.logger.log('Admin triggered doctor slug migration');
    await this.slugMigrationService.migrateDoctor();
    return {
      success: true,
      message: 'Doctor slug migration completed',
    };
  }

  @Post('slugs/users')
  async migrateUsers(@Body() body?: { adminKey?: string }) {
    this.validateAdminKey(body?.adminKey);
    this.logger.log('Admin triggered user slug migration');
    await this.slugMigrationService.migrateUser();
    return {
      success: true,
      message: 'User slug migration completed',
    };
  }
}
