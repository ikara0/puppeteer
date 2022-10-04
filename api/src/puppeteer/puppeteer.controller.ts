import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';

@Controller('puppeteer')
export class PuppeteerController {
  constructor(private pptService: PuppeteerService) {}

  @Get('/news/:alias')
  getNewsByAlias(@Param('alias') alias: string, @Query('lang') lang: string) {
    console.log(alias, lang);
    return this.pptService.getNewsByAlias(alias, lang);
  }

  @Post('refresh/news')
  refreshDb() {
    return this.pptService.refreshDb();
  }
}
