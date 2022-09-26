import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Lookup } from './lookup.entity';

@Entity('pivotPoint', { schema: 'investingV2' })
export class PivotPoint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  s3?: string;

  @Column()
  s2?: string;

  @Column()
  s1?: string;

  @Column()
  pivotPoint?: string;

  @Column()
  r1?: string;

  @Column()
  r2?: string;

  @Column()
  r3?: string;

  @ManyToOne(() => Lookup, (lookup) => lookup.pivots)
  lookup: Lookup;
}
