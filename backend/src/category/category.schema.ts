import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop({ default: true })
  active: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
