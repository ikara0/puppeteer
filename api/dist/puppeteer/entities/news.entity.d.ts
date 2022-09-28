import { Lookup } from './lookup.entinty';
export declare class News {
    id: string;
    title: string;
    spot: string;
    content?: string[];
    order?: number;
    lookup: Lookup;
}
