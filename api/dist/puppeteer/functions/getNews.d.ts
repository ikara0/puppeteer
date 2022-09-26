export declare function GetNews(url: string): Promise<{
    General: {
        head: string;
        lang: string;
        news: any;
    };
    TotalNews: any;
}>;
