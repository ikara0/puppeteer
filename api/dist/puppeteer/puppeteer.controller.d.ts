import { PuppeteerService } from './puppeteer.service';
export declare class PuppeteerController {
    private pptService;
    constructor(pptService: PuppeteerService);
    getNewsByAlias(alias: string, lang: string): Promise<any>;
    createEnNewsForDowJones(dow: string): Promise<boolean>;
    createTrNewsForDowJones(dow: string): Promise<boolean>;
}
