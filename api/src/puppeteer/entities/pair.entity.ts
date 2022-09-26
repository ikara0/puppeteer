import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Lookup } from './lookup.entity';

@Entity('pair', { schema: 'investingV2' })
export class Pair {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Lookup, (lookup) => lookup.pair)
  lookup: Lookup[];
}
