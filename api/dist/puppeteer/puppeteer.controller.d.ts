import { PuppeteerService } from './puppeteer.service';
export declare class PuppeteerController {
    private pptService;
    constructor(pptService: PuppeteerService);
    createTrNewsForApple(apple: string): Promise<boolean>;
    getNewsByAlias(alias: string, lang: string): Promise<any>;
    createEnNewsForDowJones(dow: string): Promise<boolean>;
    createTrNewsForDowJones(indice: string, lang: string): Promise<boolean>;
}
