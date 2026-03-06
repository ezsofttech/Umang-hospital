import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: require('multer').memoryStorage(),
      limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          return cb(new BadRequestException('Only image files are allowed'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder?: string,
  ) {
    const url = await this.uploadService.uploadImage(file, folder ?? 'umang-hospital');
    return { url };
  }

  @Post('logo')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: require('multer').memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB for logos
      fileFilter: (_req, file, cb) => {
        const allowedMimes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/webp'];
        if (!allowedMimes.includes(file.mimetype)) {
          return cb(
            new BadRequestException('Only SVG, PNG, JPEG, and WebP files are allowed'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadLogo(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder?: string,
  ) {
    const url = await this.uploadService.uploadLogo(file, folder ?? 'logos');
    return { url };
  }
}
