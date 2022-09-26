import { Repository } from 'typeorm';
export declare function CreateData(id: string, url: string, pairRepo: Repository<any>, lookupRepo: Repository<any>, techRepo: Repository<any>, pivotRepo: Repository<any>): Promise<boolean>;
