import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Blog {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  excerpt?: string;

  @Prop({ required: true })
  body: string;

  @Prop({ default: false })
  published: boolean;

  @Prop()
  image?: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
BlogSchema.virtual('id').get(function () {
  return this._id?.toString();
});
