import { Repository } from 'typeorm';
export declare function CreateCurrencieNews(data: any, alias: string, indiceRepo: Repository<any>, newsRepo: Repository<any>, lookupRepo: Repository<any>): Promise<boolean>;
export declare function base(url: string): Promise<string>;
