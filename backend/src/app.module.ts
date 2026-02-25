import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL ?? 'mongodb://localhost:27017/umang_hospital'),
    BlogModule,
    MessageModule,
  ],
})
export class AppModule {}
