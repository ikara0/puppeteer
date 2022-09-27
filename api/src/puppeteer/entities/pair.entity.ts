import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Lookup } from './lookup.entinty';

@Entity('pair', { schema: 'newsDb' })
export class Pair {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @OneToMany(() => Lookup, (lookup) => lookup.pair)
  lookup: Lookup[];
}
