import { PuppeteerService } from './puppeteer.service';
export declare class PuppeteerController {
    private pptService;
    constructor(pptService: PuppeteerService);
    getNewsRaw(): Promise<{
        General: {
            pair: string;
            lang: string;
            news: any;
        };
        TotalNews: any;
    }>;
}
