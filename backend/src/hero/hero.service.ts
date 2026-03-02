import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hero } from './hero.schema';
import { CreateHeroDto } from './dto/create-hero.dto';

const DEFAULT_HERO = {
  title: 'Best IVF Center & Super Specialty Hospital in Bilaspur',
  description:
    "Where Advanced Fertility Science Meets Compassionate Care. From IVF & Gynecology To Plastic Surgery, Hair Transplant, Cardiology — Experience World-Class Healthcare With Proven Results At Bilaspur's Premier Hospital.",
  backgroundImage: '/images/hero-img.svg',
  ctaButtonText: 'Book an Appointment',
  ctaButtonLink: '#appointment',
  subtitle: 'Best IVF Center & Super Specialty Hospital in Bilaspur',
};

@Injectable()
export class HeroService {
  constructor(@InjectModel(Hero.name) private heroModel: Model<Hero>) {}

  async create(createHeroDto: CreateHeroDto) {
    // Only allow one hero section
    await this.heroModel.deleteMany({});
    const newHero = new this.heroModel({ ...createHeroDto, active: true });
    const saved = await newHero.save();
    return saved.toObject();
  }

  async findAll() {
    const hero = await this.heroModel.findOne({ active: true });
    if (!hero) {
      // Create default hero if none exists
      const defaultHero = new this.heroModel({ ...DEFAULT_HERO, active: true });
      const saved = await defaultHero.save();
      return saved.toObject();
    }
    return hero.toObject();
  }

  async findOne(id: string) {
    const doc = await this.heroModel.findById(id);
    return doc ? doc.toObject() : null;
  }

  async update(id: string, updateHeroDto: CreateHeroDto) {
    console.log(`\n--- HeroService.update() called ---`);
    console.log(`Input ID: ${id}`);
    console.log(`Input DTO (raw):`, updateHeroDto);
    console.log(`Input DTO.title:`, updateHeroDto.title, `(type: ${typeof updateHeroDto.title})`);
    console.log(`Input DTO.description:`, updateHeroDto.description?.substring?.(0, 50), `(type: ${typeof updateHeroDto.description})`);
    
    const existing = await this.heroModel.findById(id);
    if (!existing) {
      console.error(`❌ Hero with id ${id} not found`);
      throw new Error(`Hero with id ${id} not found`);
    }

    console.log(`✅ Found existing hero`);
    console.log(`  Current title:`, existing.title);
    console.log(`  New title from DTO:`, updateHeroDto.title);

    // Determine title - use new value if provided and not empty
    const newTitle = (updateHeroDto.title && updateHeroDto.title.trim()) 
      ? updateHeroDto.title.trim()
      : existing.title;
    
    const newDescription = (updateHeroDto.description && updateHeroDto.description.trim())
      ? updateHeroDto.description.trim()
      : existing.description;

    console.log(`Title decision:`);
    console.log(`  DTO has title?`, !!updateHeroDto.title);
    console.log(`  DTO title trim result:`, updateHeroDto.title?.trim?.());
    console.log(`  Using title:`, newTitle);
    console.log(`Description decision:`);
    console.log(`  DTO has description?`, !!updateHeroDto.description);
    console.log(`  Using description:`, newDescription.substring(0, 50) + '...');

    // Build update data
    const updateData = {
      title: newTitle,
      description: newDescription,
      backgroundImage: updateHeroDto.backgroundImage || existing.backgroundImage,
      ctaButtonText: updateHeroDto.ctaButtonText || existing.ctaButtonText,
      ctaButtonLink: updateHeroDto.ctaButtonLink || existing.ctaButtonLink,
      subtitle: updateHeroDto.subtitle || existing.subtitle,
      active: true,
    };

    console.log(`📋 Final update data:`, updateData);

    const updated = await this.heroModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    console.log(`✅ Database update successful`);
    console.log(`Updated title in DB:`, updated?.title);
    console.log(`--- HeroService.update() end ---\n`);
    
    // Return the plain object
    return updated ? updated.toObject() : updated;
  }

  async getActive() {
    let hero = await this.heroModel.findOne({ active: true });
    if (!hero) {
      // Create default hero if none exists
      const defaultHero = new this.heroModel({ ...DEFAULT_HERO, active: true });
      hero = await defaultHero.save();
    }
    return hero.toObject();
  }
}
