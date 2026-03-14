import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type GalleryDocument = Gallery & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Gallery {
  @Prop({ required: true })
  title: string;

  @Prop()
  image?: string;

  @Prop()
  caption?: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  published: boolean;
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);
GallerySchema.virtual('id').get(function () {
  return this._id?.toString();
});
