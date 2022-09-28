import { Content } from './content.entity';
import { Lookup } from './lookup.entinty';
export declare class Summary {
    id: string;
    title: string;
    spot: string;
    lookup: Lookup;
    content?: Content[];
}
