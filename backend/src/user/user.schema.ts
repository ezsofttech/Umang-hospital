import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['admin', 'staff'] })
  role: 'admin' | 'staff';

  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, sparse: true })
  slug: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: false })
  isFirstLogin: boolean;

  @Prop({ default: true })
  isActive: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
