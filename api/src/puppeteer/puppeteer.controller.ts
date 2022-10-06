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

  @Post('/create/news')
  async refreshDb(): Promise<any> {
    return await this.pptService.refreshDb();
  }

  //use this request for set data to empty database only.
  @Post('/first')
  seedIndice() {
    this.pptService.seedIndice();
  }
  @Get('/indice')
  getIndice(): Promise<Indice[]> {
    return this.pptService.getIndice();
  }
}
