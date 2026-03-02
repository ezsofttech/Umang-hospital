import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DoctorDocument = Doctor & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Doctor {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  tag?: string;

  @Prop({ required: true })
  role: string;

  @Prop()
  qualification?: string;

  @Prop()
  about?: string;

  @Prop()
  metaDescription?: string;

  @Prop()
  keywords?: string;

  @Prop()
  specializations?: string;

  @Prop()
  image?: string;

  @Prop({ default: '0' })
  experience?: string;

  @Prop()
  department?: string;

  @Prop()
  departmentDescription?: string;

  @Prop()
  departmentHref?: string;

  @Prop({ type: [String], default: [] })
  expertise?: string[];

  @Prop({ default: true })
  active?: boolean;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
DoctorSchema.virtual('id').get(function () {
  return this._id?.toString();
});
