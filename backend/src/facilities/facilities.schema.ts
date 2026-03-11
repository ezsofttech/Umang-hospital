import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { generateSlug } from '../utils/slug';

export type FacilitiesDocument = Facilities & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Facilities {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  excerpt?: string;

  @Prop()
  metaDescription?: string;

  @Prop()
  keywords?: string;

  @Prop({ required: true })
  body: string;

  @Prop({ default: false })
  published: boolean;

  @Prop()
  image?: string;

  @Prop()
  author?: string;

  @Prop([String])
  tags?: string[];
}

export const FacilitiesSchema = SchemaFactory.createForClass(Facilities);
FacilitiesSchema.virtual('id').get(function () {
  return this._id?.toString();
});

FacilitiesSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = generateSlug(this.title);
  }
  next();
});
