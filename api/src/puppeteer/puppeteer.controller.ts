import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';

@Controller('puppeteer')
export class PuppeteerController {
  constructor(private pptService: PuppeteerService) {}

  @Post('/news/:lang')
  createTrNewsForApple(@Query('apple') apple: string) {
    return this.pptService.createTrNewsForApple(apple);
  }

  @Get('/news/:alias')
  getNewsByAlias(@Param('alias') alias: string, @Query('lang') lang: string) {
    return this.pptService.getNewsByAlias(alias, lang);
  }

  @Post('/en/news/:dow')
  createEnNewsForDowJones(@Param('dow') dow: string) {
    return this.pptService.createEnNewsForDow(dow);
  }

  @Post('/news/:lang')
  createTrNewsForDowJones(
    @Query('indice') indice: string,
    @Param('lang') lang: string,
  ) {
    return this.pptService.createTrNewsForDow(indice, lang);
  }
}
