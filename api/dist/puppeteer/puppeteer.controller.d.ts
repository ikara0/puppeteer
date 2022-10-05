import { PuppeteerService } from './puppeteer.service';
export declare class PuppeteerController {
    private pptService;
    constructor(pptService: PuppeteerService);
    getNewsByAlias(alias: string, lang: string): Promise<any>;
    refreshDb(): Promise<any>;
}
