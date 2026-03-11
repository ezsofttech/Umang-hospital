import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StatisticsDocument = Statistics & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Statistics {
  @Prop({ required: true })
  label: string;

  @Prop({ required: true })
  value: string;
}

export const StatisticsSchema = SchemaFactory.createForClass(Statistics);
