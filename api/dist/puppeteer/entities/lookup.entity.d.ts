import { Pair } from './pair.entity';
import { PivotPoint } from './pivot-points.entity';
import { TechnicalIndicator } from './tech-indicator.entity';
export declare class Lookup {
    id: string;
    timeStamp: Date;
    pair: Pair;
    pivots: PivotPoint[];
    technical?: TechnicalIndicator[];
}
