import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Indice } from './entities/indice.entity';
import { PuppeteerService } from './puppeteer.service';

@Controller('puppeteer')
export class PuppeteerController {
  constructor(private pptService: PuppeteerService) {}

  @Get('/news/:alias')
  getNewsByAlias(@Param('alias') alias: string, @Query('lang') lang: string) {
    return this.pptService.getNewsByAlias(alias, lang);
  }
  //use this request for set data to empty database only.
  @Post('/first')
  async seedIndice() {
    return await this.pptService.seedIndice();
  }
  @Get('/indice')
  getIndice(): Promise<Indice[]> {
    return this.pptService.getIndice();
  }
}
