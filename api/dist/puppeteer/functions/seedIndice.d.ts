import { Repository } from 'typeorm';
import { Indice } from '../entities/indice.entity';
export declare function SeedIndice(indiceRepo: Repository<Indice>): Promise<import("typeorm").InsertResult>;
