import { Lookup } from './lookup.entinty';
export declare class Indice {
    id: string;
    name: string;
    alias?: string;
    source?: string[];
    fetchedAt?: Date;
    lookup: Lookup[];
}
