import { Indice } from './indice.entity';
import { News } from './news.entity';
export declare class Lookup {
    id: string;
    language: string;
    timeStamp: Date;
    indice: Indice;
    news: News[];
}
