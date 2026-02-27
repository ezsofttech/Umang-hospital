import { Injectable, BadRequestException, OnModuleInit } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadService implements OnModuleInit {
  onModuleInit() {
    const url = process.env.CLOUDINARY_URL ?? '';
    // Parse cloudinary://api_key:api_secret@cloud_name
    const match = url.match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);
    if (!match) {
      console.warn('[Upload] CLOUDINARY_URL missing or invalid – uploads will fail');
      return;
    }
    cloudinary.config({
      api_key: match[1],
      api_secret: match[2],
      cloud_name: match[3],
    });
    console.log(`[Upload] Cloudinary configured for cloud: ${match[3]}`);
  }

  async uploadImage(file: Express.Multer.File, folder = 'umang-hospital'): Promise<string> {
    if (!file) throw new BadRequestException('No file provided');

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder, resource_type: 'image', quality: 'auto', fetch_format: 'auto' },
        (error, result) => {
          if (error) return reject(new BadRequestException(error.message));
          resolve(result!.secure_url);
        },
      );
      uploadStream.end(file.buffer);
    });
  }

  async deleteImage(url: string): Promise<void> {
    if (!url || !url.includes('res.cloudinary.com')) return;
    try {
      // Extract public_id: strip domain+upload prefix, optional version, and file extension
      const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[^.]+$/);
      if (!match) return;
      const publicId = match[1];
      await cloudinary.uploader.destroy(publicId);
      console.log(`[Upload] Deleted Cloudinary image: ${publicId}`);
    } catch (err) {
      console.warn('[Upload] Failed to delete Cloudinary image:', err);
    }
  }
}
