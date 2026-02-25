import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { toResponse, toResponseList } from '../utils/mongo';

@Injectable()
export class MessageService {
  constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {}

  async create(dto: CreateMessageDto) {
    const doc = await this.messageModel.create(dto);
    return toResponse(doc.toObject());
  }

  async findAll() {
    const docs = await this.messageModel.find().sort({ createdAt: -1 }).lean().exec();
    return toResponseList(docs);
  }

  async findOne(id: string) {
    const doc = await this.messageModel.findById(id).lean().exec();
    if (!doc) throw new NotFoundException('Message not found');
    return toResponse(doc);
  }

  async markRead(id: string) {
    const doc = await this.messageModel
      .findByIdAndUpdate(id, { $set: { read: true } }, { new: true })
      .lean()
      .exec();
    if (!doc) throw new NotFoundException('Message not found');
    return toResponse(doc);
  }

  async remove(id: string) {
    const result = await this.messageModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Message not found');
    return toResponse(result.toObject());
  }
}
