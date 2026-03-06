import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AboutDocument = About & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class About {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  subtitle: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], default: [] })
  features: string[];

  @Prop({ required: false })
  mainImage?: string;

  @Prop({ required: false })
  experienceBadgeImage?: string;

  @Prop({ default: true })
  active: boolean;
}

export const AboutSchema = SchemaFactory.createForClass(About);
