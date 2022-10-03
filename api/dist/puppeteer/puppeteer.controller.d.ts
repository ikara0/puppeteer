import { PuppeteerService } from './puppeteer.service';
export declare class PuppeteerController {
    private pptService;
    constructor(pptService: PuppeteerService);
    getNewsByAlias(alias: string, lang: string): Promise<any>;
    createNewsByAliasAndLangForCurrencies(alias: string, lang: string): Promise<boolean>;
    createNewsByAliasAndLangForCrypto(): Promise<boolean>;
    refreshCurrencies(): Promise<import("./entities/indice.entity").Indice[]>;
}
