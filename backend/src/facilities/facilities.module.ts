import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FacilitiesController } from './facilities.controller';
import { FacilitiesService } from './facilities.service';
import { Facilities, FacilitiesSchema } from './facilities.schema';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Facilities.name, schema: FacilitiesSchema }]),
    UploadModule,
  ],
  controllers: [FacilitiesController],
  providers: [FacilitiesService],
  exports: [FacilitiesService],
})
export class FacilitiesModule {}
