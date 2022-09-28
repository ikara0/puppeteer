import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Lookup } from './lookup.entinty';

@Entity('news', { schema: 'newsDb' })
export class News {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  spot: string;

  @Column('simple-array')
  content?: string[];

  @Column()
  order?: number;

  @ManyToOne(() => Lookup, (lookup) => lookup.news)
  lookup: Lookup;
}
