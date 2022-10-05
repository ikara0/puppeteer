import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Lookup } from './lookup.entinty';

@Entity('indice', { schema: 'newsDb' })
export class Indice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  alias?: string;

  @Column({ type: 'simple-array', nullable: true })
  source?: string[];

  @Column({ type: 'timestamptz', nullable: true })
  fetchedAt?: Date;

  @OneToMany(() => Lookup, (lookup) => lookup.indice)
  lookup: Lookup[];
}
