import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ unique: true, sparse: true })
  slug: string;

  @Prop()
  description: string;

  @Prop()
  metaDescription: string;

  @Prop()
  keywords: string;

  @Prop()
  image: string;

  @Prop({ default: true })
  active: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
