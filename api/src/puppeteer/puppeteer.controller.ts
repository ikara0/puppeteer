import { Controller, Get, Param, Post } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';

@Controller('puppeteer')
export class PuppeteerController {
  constructor(private pptService: PuppeteerService) {}

  @Post('/pair')
  createPairs(): Promise<boolean> {
    return this.pptService.createPairs();
  }
  @Get('/technical/:id')
  getPivotsById(@Param('id') id: string) {
    return this.pptService.getAnalysisByPairId(id);
  }
  @Get('/deneme')
  deneme() {
    return this.pptService.deneme();
  }

  @Post('/tech/create-EurUsd/:id')
  createTechAnalysisForEurUsd(@Param('id') id: string): Promise<boolean> {
    return this.pptService.createTechAnalysisForEurUsd(id);
  }

  @Post('/tech/create-BtcUsd/:id')
  createTechAnalysisForBtcUsd(@Param('id') id: string): Promise<boolean> {
    return this.pptService.createTechAnalysisForBtcUsd(id);
  }

  @Post('/tech/create-UsdTry/:id')
  createTechAnalysisForUsdTry(@Param('id') id: string): Promise<boolean> {
    return this.pptService.createTechAnalysisForUsdTry(id);
  }

  @Post('/tech/refresh')
  refreshAllTechnical(): Promise<boolean> {
    return this.pptService.refreshAllTechnical();
  }
}
