import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Subcategory extends Document {
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
  explanation: string;

  @Prop()
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true })
  categoryId: string;

  @Prop({ default: true })
  active: boolean;
}

export const SubcategorySchema = SchemaFactory.createForClass(Subcategory);
