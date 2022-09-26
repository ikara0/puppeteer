import { Repository } from 'typeorm';
import { Pair } from './entities/pair.entity';
import { PivotPoint } from './entities/pivot-points.entity';
import { Lookup } from './entities/lookup.entity';
import { PairPivot } from './dtos/pair-pivots.dto';
import { TechnicalIndicator } from './entities/tech-indicator.entity';
export declare class PuppeteerService {
    private pairRepo;
    private lookupRepo;
    private pivotRepo;
    private techRepo;
    constructor(pairRepo: Repository<Pair>, lookupRepo: Repository<Lookup>, pivotRepo: Repository<PivotPoint>, techRepo: Repository<TechnicalIndicator>);
    refreshAllTechnical(): Promise<boolean>;
    createTechAnalysisForEurUsd(id: string): Promise<boolean>;
    createTechAnalysisForBtcUsd(id: string): Promise<boolean>;
    createTechAnalysisForUsdTry(id: string): Promise<boolean>;
    deneme(): Promise<{
        General: {
            head: string;
            lang: string;
            news: any;
        };
        TotalNews: any;
    }>;
    getAnalysisByPairId(id: string): Promise<PairPivot>;
    createPairs(): Promise<boolean>;
}
