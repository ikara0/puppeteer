import { Module } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';
import { PuppeteerController } from './puppeteer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Indice } from './entities/indice.entity';
import { Lookup } from './entities/lookup.entinty';
import { News } from './entities/news.entity';

@Module({
  providers: [PuppeteerService],
  controllers: [PuppeteerController],
  imports: [TypeOrmModule.forFeature([Indice, Lookup, News])],
})
export class PuppeteerModule {}
