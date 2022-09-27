export declare class PuppeteerService {
    constructor();
    getRawNewsAppl(): Promise<{
        General: {
            pair: string;
            lang: string;
            news: any;
        };
        TotalNews: any;
    }>;
}
