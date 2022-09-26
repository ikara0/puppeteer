import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pair } from './pair.entity';
import { PivotPoint } from './pivot-points.entity';
import { TechnicalIndicator } from './tech-indicator.entity';

@Entity('lookup', { schema: 'investingV2' })
export class Lookup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz', nullable: true })
  timeStamp: Date;

  @ManyToOne(() => Pair, (pair) => pair.lookup)
  pair: Pair;

  @OneToMany(() => PivotPoint, (pivotPoint) => pivotPoint.lookup)
  pivots: PivotPoint[];

  @OneToMany(() => TechnicalIndicator, (techAnalysis) => techAnalysis.lookup)
  technical?: TechnicalIndicator[];
}
