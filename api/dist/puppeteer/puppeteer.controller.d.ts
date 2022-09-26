import { PuppeteerService } from './puppeteer.service';
export declare class PuppeteerController {
    private pptService;
    constructor(pptService: PuppeteerService);
    createPairs(): Promise<boolean>;
    getPivotsById(id: string): Promise<import("./dtos/pair-pivots.dto").PairPivot>;
    deneme(): Promise<{
        General: {
            head: string;
            lang: string;
            news: any;
        };
        TotalNews: any;
    }>;
    createTechAnalysisForEurUsd(id: string): Promise<boolean>;
    createTechAnalysisForBtcUsd(id: string): Promise<boolean>;
    createTechAnalysisForUsdTry(id: string): Promise<boolean>;
    refreshAllTechnical(): Promise<boolean>;
}
