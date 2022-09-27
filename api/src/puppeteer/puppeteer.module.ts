import { Module } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';
import { PuppeteerController } from './puppeteer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pair } from './entities/pair.entity';
import { Lookup } from './entities/lookup.entinty';

@Module({
  providers: [PuppeteerService],
  controllers: [PuppeteerController],
  imports: [TypeOrmModule.forFeature([Pair, Lookup])],
})
export class PuppeteerModule {}
