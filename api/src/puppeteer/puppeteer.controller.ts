import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';

@Controller('puppeteer')
export class PuppeteerController {
  constructor(private pptService: PuppeteerService) {}

  // @Post('en/news/:apple')
  // createEnNewsForApple(@Param('apple') apple: string) {
  //   return this.pptService.createEnNewsForApple(apple);
  // }

  // @Post('/tr/news/:apple')
  // createTrNewsForApple(@Param('apple') apple: string) {
  //   return this.pptService.createTrNewsForApple(apple);
  // }

  @Get('/news/:alias')
  getNewsByAlias(@Param('alias') alias: string, @Body('lang') lang: string) {
    return this.pptService.getNewsByAlias(alias, lang);
  }

  @Post('/en/news/:dow')
  createEnNewsForDowJones(@Param('dow') dow: string) {
    return this.pptService.createEnNewsForDow(dow);
  }

  @Post('/tr/news/:dow')
  createTrNewsForDowJones(@Param('dow') dow: string) {
    return this.pptService.createTrNewsForDow(dow);
  }
}
