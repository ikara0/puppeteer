import { Indice } from './entities/indice.entity';
import { PuppeteerService } from './puppeteer.service';
export declare class PuppeteerController {
    private pptService;
    constructor(pptService: PuppeteerService);
    getNewsByAlias(alias: string, lang: string): Promise<any>;
    seedIndice(): Promise<import("typeorm").InsertResult>;
    getIndice(): Promise<Indice[]>;
}
