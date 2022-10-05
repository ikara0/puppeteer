import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Indice } from './entities/indice.entity';
import { Lookup } from './entities/lookup.entinty';
import { News } from './entities/news.entity';
import { CreateNews } from './functions/createNews';
import { GetCryptoNews } from './functions/getCryptoNews';

import { GetNews } from './functions/getNews';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class PuppeteerService {
  constructor(
    @InjectRepository(Lookup) private lookupRepo: Repository<Lookup>,
    @InjectRepository(Indice) private indiceRepo: Repository<Indice>,
    @InjectRepository(News) private newsRepo: Repository<News>,
  ) {}
  @Cron('0 */2 * * * *')
  async refreshDb() {
    const firstEntity = await this.indiceRepo.find({
      order: { fetchedAt: 'ASC' },
      select: ['id', 'alias', 'source', 'fetchedAt'],
    });

    const fetched = firstEntity[0];
    console.log(fetched);
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
        console.log(data);
      } else {
        const data = await GetNews(item);
        const create = await CreateNews(
          data,
          fetched.alias,
          this.indiceRepo,
          this.newsRepo,
          this.lookupRepo,
        );
        console.log(data);
      }
    });
    fetched.fetchedAt = new Date();
    await this.indiceRepo.save(fetched);
    return fetched;
  }
  async getNewsByAlias(alias: string, lang: string) {
    const indice = await this.indiceRepo.findOne({ where: { alias: alias } });
    if (!indice) {
      return null;
    }
    console.log('indice bulundu');
    console.log(indice);

    const lookup = await this.lookupRepo
      .createQueryBuilder('lookup')
      .where('lookup.indiceId =:indiceId', { indiceId: indice.id })
      .andWhere('lookup.language =:language', { language: lang })
      .orderBy('lookup.timeStamp', 'DESC')
      .getOne();

    console.log('lookup bulundu');
    console.log(lookup);

    const news = await this.newsRepo
      .createQueryBuilder('news')
      .where('news.lookupId =:lookupId', { lookupId: lookup.id })
      .orderBy('news.order', 'ASC')
      .getMany();
    console.log('news bulundu');

    const result: any = {
      indiceName: indice.name,
      time: lookup.timeStamp,
      language: lookup.language,
      news: news,
    };
    return result;
  }
  // @Cron(CronExpression.EVERY_10_MINUTES)
  // async cronJob() {
  //   console.log('Cron Running');
  //   const firstLookup = await this.lookupRepo.find({
  //     order: { timeStamp: 'ASC' },
  //     relations: {
  //       indice: true,
  //     },
  //     select: ['id', 'timeStamp', 'language', 'indice'],
  //   });
  //   let url: string;
  //   const { indice } = firstLookup[0];
  //   if (firstLookup[0].language === 'en') {
  //     const enURL = indice.source.filter((url) => url.includes('www'))[0];
  //     url = enURL;
  //   } else {
  //     const trURL = indice.source.filter((url) => url.includes('tr'))[0];
  //     url = trURL;
  //   }
  //   try {
  //     if (url.includes('crypto')) {
  //       console.log('crypto', url);
  //       const data = await GetCryptoNews(url);
  //       const result = await CreateNews(
  //         data,
  //         indice.alias,
  //         this.indiceRepo,
  //         this.newsRepo,
  //         this.lookupRepo,
  //       );
  //     } else {
  //       console.log('currencies', url);
  //       const data = await GetNews(url);
  //       const result = await CreateNews(
  //         data,
  //         indice.alias,
  //         this.indiceRepo,
  //         this.newsRepo,
  //         this.lookupRepo,
  //       );
  //     }
  //     const news = await this.newsRepo
  //       .createQueryBuilder('news')
  //       .where('news.lookupId =:lookupId', { lookupId: firstLookup[0].id })
  //       .getMany();
  //     this.newsRepo.remove(news);
  //     this.lookupRepo.remove(firstLookup[0]);
  //     return true;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // }
}
