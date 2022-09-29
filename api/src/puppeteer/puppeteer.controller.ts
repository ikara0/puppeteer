import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';

@Controller('puppeteer')
export class PuppeteerController {
  constructor(private pptService: PuppeteerService) {}

  @Get('/news/:alias')
  getNewsByAlias(@Param('alias') alias: string, @Query('lang') lang: string) {
    return this.pptService.getNewsByAlias(alias, lang);
  }

  @Post('news/:alias')
  createNewsByAliasAndLang(
    @Param('alias') alias: string,
    @Query('lang') lang: string,
  ) {
    return this.pptService.createNewsByAliasAndLang(alias, lang);
  }
}
