import { Lookup } from './lookup.entinty';
export declare class News {
    id: string;
    title: string;
    spot: string;
    content?: string;
    sumImgURL: string;
    order?: number;
    lookup: Lookup;
}
