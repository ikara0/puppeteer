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

  @Column({ array: true })
  content: string;

  @Column({ nullable: true })
  sumImgURL: string;

  @Column()
  order: number;

  @Column({ nullable: true })
  dateTime: string;

  @ManyToOne(() => Lookup, (lookup) => lookup.news)
  lookup: Lookup;
}
