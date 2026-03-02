import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('migrate/regenerate-slugs')
  async regenerateSlugs() {
    return await this.blogService.regenerateMissingSlugs();
  }

  @Post()
  create(@Body() dto: CreateBlogDto) {
    return this.blogService.create(dto);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.blogService.findBySlug(slug);
  }

  @Get(':slugOrId')
  async findOne(@Param('slugOrId') slugOrId: string) {
    return await this.blogService.findOneBySlugOrId(slugOrId);
  }

  @Get()
  findAll(@Query('published') published?: string) {
    const publishedOnly = published === 'true';
    return this.blogService.findAll(publishedOnly);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBlogDto) {
    return this.blogService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
