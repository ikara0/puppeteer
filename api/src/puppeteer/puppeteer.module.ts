import { Module } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';
import { PuppeteerController } from './puppeteer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pair } from './entities/pair.entity';
import { PivotPoint } from './entities/pivot-points.entity';
import { Lookup } from './entities/lookup.entity';
import { TechnicalIndicator } from './entities/tech-indicator.entity';

@Module({
  providers: [PuppeteerService],
  controllers: [PuppeteerController],
  imports: [
    TypeOrmModule.forFeature([Pair, PivotPoint, Lookup, TechnicalIndicator]),
  ],
})
export class PuppeteerModule {}
