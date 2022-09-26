import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Lookup } from './lookup.entity';

@Entity('technicalIndicator', { schema: 'investingV2' })
export class TechnicalIndicator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name?: string;

  @Column()
  value?: string;

  @Column()
  action?: string;

  @ManyToOne(() => Lookup, (lookup) => lookup.technical)
  lookup?: Lookup;
}
