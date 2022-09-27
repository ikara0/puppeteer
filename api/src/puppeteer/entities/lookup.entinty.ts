import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Pair } from './pair.entity';

@Entity('lookup', { schema: 'newsDb' })
export class Lookup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Pair, (pair) => pair.lookup)
  pair: Pair;

  @Column()
  lang: string;

  @Column({ type: 'timestamptz', nullable: true })
  createdAt: string;
}
