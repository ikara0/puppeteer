import { Repository } from 'typeorm';
import { Indice } from './entities/indice.entity';
import { Lookup } from './entities/lookup.entinty';
import { News } from './entities/news.entity';
export declare class PuppeteerService {
    private lookupRepo;
    private indiceRepo;
    private newsRepo;
    constructor(lookupRepo: Repository<Lookup>, indiceRepo: Repository<Indice>, newsRepo: Repository<News>);
    refreshDb(alias: string): Promise<Promise<boolean>[]>;
    getNewsByAlias(alias: string, lang: string): Promise<any>;
    cronJob(): Promise<boolean>;
}
