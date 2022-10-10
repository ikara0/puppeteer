import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Indice } from './entities/indice.entity';
import { Lookup } from './entities/lookup.entinty';
import { News } from './entities/news.entity';
import { CreateNews } from './functions/createNews';
import { GetCryptoNews } from './functions/getCryptoNews';

import { GetNews } from './functions/getNews';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SeedIndice } from './functions/seedIndice';

@Injectable()
export class PuppeteerService {
  constructor(
    @InjectRepository(Lookup) private lookupRepo: Repository<Lookup>,
    @InjectRepository(Indice) private indiceRepo: Repository<Indice>,
    @InjectRepository(News) private newsRepo: Repository<News>,
  ) {}

  getIndice(): Promise<Indice[]> {
    const result = this.indiceRepo.find({
      select: ['id', 'alias', 'name'],
    });
    return result;
  }

  seedIndice() {
    const result = SeedIndice(this.indiceRepo);
    return result;
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async refreshDb() {
    const firstEntity = await this.indiceRepo.find({
      order: { fetchedAt: 'ASC' },
      select: ['id', 'alias', 'source', 'fetchedAt'],
    });
    const fetched = firstEntity[0];
    const result = fetched.source.map(async (item) => {
      if (item.includes('crypto')) {
        const data = await GetCryptoNews(item);
        const creat = await CreateNews(
          data,
          fetched.alias,
          this.indiceRepo,
          this.newsRepo,
          this.lookupRepo,
        );
      } else {
        const data = await GetNews(item);
        const create = await CreateNews(
          data,
          fetched.alias,
          this.indiceRepo,
          this.newsRepo,
          this.lookupRepo,
        );
      }
    });
    return fetched;
  }
  async getNewsByAlias(alias: string, lang: string) {
    const indice = await this.indiceRepo.findOne({ where: { alias: alias } });
    if (!indice) {
      return null;
    }
    const lookup = await this.lookupRepo
      .createQueryBuilder('lookup')
      .where('lookup.indiceId =:indiceId', { indiceId: indice.id })
      .andWhere('lookup.language =:language', { language: lang })
      .orderBy('lookup.timeStamp', 'DESC')
      .getOne();

    const news = await this.newsRepo
      .createQueryBuilder('news')
      .where('news.lookupId =:lookupId', { lookupId: lookup.id })
      .orderBy('news.order', 'ASC')
      .getMany();
    const result: any = {
      indiceName: indice.name,
      time: lookup.timeStamp,
      language: lookup.language,
      news: news,
    };
    return result;
  }
}
