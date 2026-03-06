import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { About } from './about.schema';
import { CreateAboutDto } from './dto/create-about.dto';

const DEFAULT_ABOUT = {
  title: "Bilaspur's Premier IVF & Super Specialty Hospital",
  subtitle: 'Super Specialty Hospital',
  description:
    'Umang IVF & Super Specialty Hospital Has Been Serving The People Of Bilaspur And Chhattisgarh With Dedication And Compassion. As The Region\'s Leading IVF Center And Super Specialty Hospital, We Combine Cutting-Edge Technology With Personalized Care — From Advanced Fertility Treatment, Cosmetic Surgery To Cardiology, Urology, And 24/7 Emergency Services.',
  features: [
    'Advanced IVF Lab With International-Standard Protocols',
    'Expert Plastic Surgeons & Dermatologists',
    'Board-Certified Cardiologists & Urologists',
    '24/7 Emergency And Ambulance Services',
    'Affordable, Transparent Pricing',
  ],
  mainImage: '/images/about-us-img.svg',
  experienceBadgeImage: '/images/15plus-ex-img.svg',
};

@Injectable()
export class AboutService {
  constructor(@InjectModel(About.name) private aboutModel: Model<About>) {}

  async create(createAboutDto: CreateAboutDto) {
    // Only allow one about section
    await this.aboutModel.deleteMany({});
    const newAbout = new this.aboutModel({ ...createAboutDto, active: true });
    const saved = await newAbout.save();
    return saved.toObject();
  }

  async findAll() {
    const about = await this.aboutModel.findOne({ active: true });
    if (!about) {
      // Create default about if none exists
      const defaultAbout = new this.aboutModel({ ...DEFAULT_ABOUT, active: true });
      const saved = await defaultAbout.save();
      return saved.toObject();
    }
    return about.toObject();
  }

  async update(id: string, updateAboutDto: CreateAboutDto) {
    const existing = await this.aboutModel.findById(id);
    if (!existing) {
      throw new Error(`About section with id ${id} not found`);
    }

    const updateData = {
      title: updateAboutDto.title || existing.title,
      subtitle: updateAboutDto.subtitle || existing.subtitle,
      description: updateAboutDto.description || existing.description,
      features: updateAboutDto.features || existing.features,
      mainImage: updateAboutDto.mainImage || existing.mainImage,
      experienceBadgeImage: updateAboutDto.experienceBadgeImage || existing.experienceBadgeImage,
      active: true,
    };

    const updated = await this.aboutModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return updated ? updated.toObject() : updated;
  }

  async getActive() {
    let about = await this.aboutModel.findOne({ active: true });
    if (!about) {
      // Create default about if none exists
      const defaultAbout = new this.aboutModel({ ...DEFAULT_ABOUT, active: true });
      about = await defaultAbout.save();
    }
    return about.toObject();
  }
}
