import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Indice } from './indice.entity';
import { News } from './news.entity';

@Entity('lookup', { schema: 'newsDb' })
export class Lookup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  language: string;

  @Column({ type: 'timestamptz', nullable: true })
  timeStamp: Date;

  @ManyToOne(() => Indice, (indice) => indice.lookup)
  indice: Indice;

  @OneToMany(() => News, (news) => news.lookup)
  news: News[];
}
