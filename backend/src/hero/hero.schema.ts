import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HeroDocument = Hero & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Hero {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  backgroundImage?: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ required: false })
  ctaButtonText?: string;

  @Prop({ required: false })
  ctaButtonLink?: string;

  @Prop({ default: 'Best IVF Center & Super Specialty Hospital in Bilaspur' })
  subtitle?: string;
}

export const HeroSchema = SchemaFactory.createForClass(Hero);
