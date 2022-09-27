import { Controller, Get, Param, Post } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';

@Controller('puppeteer')
export class PuppeteerController {
  constructor(private pptService: PuppeteerService) {}

  @Get('news/applEn')
  getNewsRaw() {
    return this.pptService.getRawNewsAppl();
  }
}
