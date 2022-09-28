import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseUrls } from './constants/baseUrls.contants';
import { Indice } from './entities/indice.entity';
import { Lookup } from './entities/lookup.entinty';
import { News } from './entities/news.entity';

import { GetNews } from './functions/getNews';

@Injectable()
export class PuppeteerService {
  constructor(
    @InjectRepository(Lookup) private lookupRepo: Repository<Lookup>,
    @InjectRepository(Indice) private indiceRepo: Repository<Indice>,
    @InjectRepository(News) private newsRepo: Repository<News>,
  ) {}

  async createEnNewsForApple(apple: string) {
    const result = await GetNews(BaseUrls.ApplEn);
    // return result;
    try {
      const exist = await this.indiceRepo.findOne({ where: { alias: apple } });
      if (exist) {
        const lookup = new Lookup();
        lookup.language = result.Lang;
        lookup.indice = exist;
        lookup.timeStamp = new Date();
        const lookupResult = this.lookupRepo.create(lookup);
        await this.lookupRepo.save(lookupResult);
        console.log('lookup kaydedildi');

        for (const item of result.TotalNews) {
          const news = new News();
          news.lookup = lookupResult;
          news.title = item.news.title;
          news.spot = item.news.spot;
          news.content = item.news.context;
          news.order = item.news.order;

          const newsResult = this.newsRepo.create(news);
          await this.newsRepo.save(newsResult);
          console.log('news Kaydedildi');
        }
        return true;
      }
      const alias: string = result.IndiceName.split(' ')[0];
      const index = new Indice();
      index.name = result.IndiceName;
      index.alias = alias.toLocaleLowerCase();
      const indexResult = this.indiceRepo.create(index);
      await this.indiceRepo.save(indexResult);
      console.log('index kaydedildi');

      const lookup = new Lookup();
      lookup.language = result.Lang;
      lookup.indice = indexResult;
      lookup.timeStamp = new Date();
      const lookupResult = this.lookupRepo.create(lookup);
      await this.lookupRepo.save(lookupResult);
      console.log('lookup kaydedildi');

      for (const item of result.TotalNews) {
        const news = new News();
        news.lookup = lookupResult;
        news.title = item.news.title;
        news.spot = item.news.spot;
        news.content = item.news.context;
        news.order = item.news.order;

        const newsResult = this.newsRepo.create(news);
        await this.newsRepo.save(newsResult);
        console.log('news Kaydedildi');
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async createTrNewsForApple(apple: string) {
    const result = await GetNews(BaseUrls.ApplTr);
    // return result;
    try {
      const exist = await this.indiceRepo.findOne({ where: { alias: apple } });
      if (exist) {
        const lookup = new Lookup();
        lookup.language = result.Lang;
        lookup.indice = exist;
        lookup.timeStamp = new Date();
        const lookupResult = this.lookupRepo.create(lookup);
        await this.lookupRepo.save(lookupResult);
        console.log('lookup kaydedildi');

        for (const item of result.TotalNews) {
          const news = new News();
          news.lookup = lookupResult;
          news.title = item.news.title;
          news.spot = item.news.spot;
          news.content = item.news.context;
          news.order = item.news.order;

          const newsResult = this.newsRepo.create(news);
          await this.newsRepo.save(newsResult);
          console.log('news Kaydedildi');
        }
        return true;
      }
      const alias: string = result.IndiceName.split(' ')[0];
      const index = new Indice();
      index.name = result.IndiceName;
      index.alias = alias.toLocaleLowerCase();
      const indexResult = this.indiceRepo.create(index);
      await this.indiceRepo.save(indexResult);
      console.log('index kaydedildi');

      const lookup = new Lookup();
      lookup.language = result.Lang;
      lookup.indice = indexResult;
      lookup.timeStamp = new Date();
      const lookupResult = this.lookupRepo.create(lookup);
      await this.lookupRepo.save(lookupResult);
      console.log('lookup kaydedildi');

      for (const item of result.TotalNews) {
        const news = new News();
        news.lookup = lookupResult;
        news.title = item.news.title;
        news.spot = item.news.spot;
        news.content = item.news.context;
        news.order = item.news.order;

        const newsResult = this.newsRepo.create(news);
        await this.newsRepo.save(newsResult);
        console.log('news Kaydedildi');
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
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

  async createEnNewsForDow(dow: string) {
    const result = await GetNews(BaseUrls.DowJonesEn);
    // return result;
    try {
      const exist = await this.indiceRepo.findOne({ where: { alias: dow } });
      if (exist) {
        const lookup = new Lookup();
        lookup.language = result.Lang;
        lookup.indice = exist;
        lookup.timeStamp = new Date();
        const lookupResult = this.lookupRepo.create(lookup);
        await this.lookupRepo.save(lookupResult);
        console.log('lookup kaydedildi');

        for (const item of result.TotalNews) {
          const news = new News();
          news.lookup = lookupResult;
          news.title = item.news.title;
          news.spot = item.news.spot;
          news.content = item.news.context;
          news.order = item.news.order;

          const newsResult = this.newsRepo.create(news);
          await this.newsRepo.save(newsResult);
          console.log('news Kaydedildi');
        }
        return true;
      }
      const alias: string = result.IndiceName.split(' ')[0];
      const index = new Indice();
      index.name = result.IndiceName;
      index.alias = alias.toLocaleLowerCase();
      const indexResult = this.indiceRepo.create(index);
      await this.indiceRepo.save(indexResult);
      console.log('index kaydedildi');

      const lookup = new Lookup();
      lookup.language = result.Lang;
      lookup.indice = indexResult;
      lookup.timeStamp = new Date();
      const lookupResult = this.lookupRepo.create(lookup);
      await this.lookupRepo.save(lookupResult);
      console.log('lookup kaydedildi');

      for (const item of result.TotalNews) {
        const news = new News();
        news.lookup = lookupResult;
        news.title = item.news.title;
        news.spot = item.news.spot;
        news.content = item.news.context;
        news.order = item.news.order;

        const newsResult = this.newsRepo.create(news);
        await this.newsRepo.save(newsResult);
        console.log('news Kaydedildi');
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async createTrNewsForDow(dow: string) {
    const result = await GetNews(BaseUrls.DowJonseTr);
    // return result;
    try {
      const exist = await this.indiceRepo.findOne({ where: { alias: dow } });
      if (exist) {
        const lookup = new Lookup();
        lookup.language = result.Lang;
        lookup.indice = exist;
        lookup.timeStamp = new Date();
        const lookupResult = this.lookupRepo.create(lookup);
        await this.lookupRepo.save(lookupResult);
        console.log('lookup kaydedildi');

        for (const item of result.TotalNews) {
          const news = new News();
          news.lookup = lookupResult;
          news.title = item.news.title;
          news.spot = item.news.spot;
          news.content = item.news.context;
          news.order = item.news.order;

          const newsResult = this.newsRepo.create(news);
          await this.newsRepo.save(newsResult);
          console.log('news Kaydedildi');
        }
        return true;
      }
      const alias: string = result.IndiceName.split(' ')[0];
      const index = new Indice();
      index.name = result.IndiceName;
      index.alias = alias.toLocaleLowerCase();
      const indexResult = this.indiceRepo.create(index);
      await this.indiceRepo.save(indexResult);
      console.log('index kaydedildi');

      const lookup = new Lookup();
      lookup.language = result.Lang;
      lookup.indice = indexResult;
      lookup.timeStamp = new Date();
      const lookupResult = this.lookupRepo.create(lookup);
      await this.lookupRepo.save(lookupResult);
      console.log('lookup kaydedildi');

      for (const item of result.TotalNews) {
        const news = new News();
        news.lookup = lookupResult;
        news.title = item.news.title;
        news.spot = item.news.spot;
        news.content = item.news.context;
        news.order = item.news.order;

        const newsResult = this.newsRepo.create(news);
        await this.newsRepo.save(newsResult);
        console.log('news Kaydedildi');
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
