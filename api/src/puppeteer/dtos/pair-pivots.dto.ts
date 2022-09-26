import { Lookup } from '../entities/lookup.entity';
import { Pair } from '../entities/pair.entity';
import { PivotPoint } from '../entities/pivot-points.entity';
import { TechnicalIndicator } from '../entities/tech-indicator.entity';

export class PairPivot {
  pair: Pair['name'];
  description: Pair['description'];
  timeStamp: Lookup['timeStamp'];
  pivots: PivotPoint[];
  technical: TechnicalIndicator[];
}
