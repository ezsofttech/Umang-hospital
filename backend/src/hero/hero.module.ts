import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Hero, HeroSchema } from './hero.schema';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Hero.name, schema: HeroSchema }])],
  controllers: [HeroController],
  providers: [HeroService],
  exports: [HeroService],
})
export class HeroModule {}
