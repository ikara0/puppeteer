export declare function GetNews(url: string): Promise<{
    General: {
        pair: string;
        lang: string;
        news: any;
    };
    TotalNews: any;
}>;
