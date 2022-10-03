import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
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

  async createNewsByAliasAndLang(alias: string, lang: string) {
    const url = this.setUrl(alias, lang);

    const result = await GetNews(url);
    // return result;

    try {
      const exist = await this.indiceRepo.findOne({ where: { alias: alias } });
      if (exist) {
        const lookup = new Lookup();
        lookup.language = result.lang;
        lookup.indice = exist;
        lookup.timeStamp = new Date();
        const lookupResult = this.lookupRepo.create(lookup);
        await this.lookupRepo.save(lookupResult);
        console.log('lookup kaydedildi');
        for (const item of result.news) {
          const news = new News();
          let lastImg = await this.base(item.sumImgSrc);
          news.sumImgURL = `data:image/jpeg;base64,${lastImg}`;
          news.lookup = lookupResult;
          news.title = item.title;
          news.spot = item.spot;
          news.content = item.content;
          news.order = item.order;
          const newsResult = this.newsRepo.create(news);
          await this.newsRepo.save(newsResult);
          console.log('news Kaydedildi');
        }
        return true;
      }
      const newsAlias: string = result.IndiceName.split(' ')[0];
      const index = new Indice();
      index.name = result.indiceName;
      index.alias = newsAlias.toLocaleLowerCase();
      const indexResult = this.indiceRepo.create(index);
      await this.indiceRepo.save(indexResult);
      console.log('index kaydedildi');

      const lookup = new Lookup();
      lookup.language = result.lang;
      lookup.indice = indexResult;
      lookup.timeStamp = new Date();
      const lookupResult = this.lookupRepo.create(lookup);
      await this.lookupRepo.save(lookupResult);
      console.log('lookup kaydedildi');

      for (const item of result.news) {
        const news = new News();
        let lastImg = await this.base(item.sumImgSrc);
        news.sumImgURL = `data:image/jpeg;base64,${lastImg}`;
        news.lookup = lookupResult;
        news.title = item.title;
        news.spot = item.spot;
        news.content = item.content;
        news.order = item.order;

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

  setUrl = (alias: string, lang: string) => {
    let url = '';
    switch (alias) {
      case 'apple':
        if (lang === 'en') {
          url = BaseUrls.ApplEn;
          break;
        }
        url = BaseUrls.ApplTr;
        break;
      case 'dow':
        if (lang === 'en') {
          url = BaseUrls.DowJonesEn;
          break;
        }
        url = BaseUrls.DowJonseTr;
        break;
      case 'eurUsd':
        if (lang === 'en') {
          url = BaseUrls.EurUsdEn;
          break;
        }
        url = BaseUrls.EurUsdTr;
        break;
      case 'gbpUsd':
        if (lang === 'en') {
          url = BaseUrls.GbpUsdEn;
          break;
        }
        url = BaseUrls.GbpUsdTr;
        break;
      case 'usdJpy':
        if (lang === 'en') {
          url = BaseUrls.UsdJpyEn;
          break;
        }
        url = BaseUrls.UsdJpyTr;
        break;
      case 'usdChf':
        if (lang === 'en') {
          url = BaseUrls.UsdChfEn;
          break;
        }
        url = BaseUrls.UsdChfTr;
        break;
      case 'audUsd':
        if (lang === 'en') {
          url = BaseUrls.AudUsdEn;
          break;
        }
        url = BaseUrls.AudUsdTr;
        break;
      case 'eurGbp':
        if (lang === 'en') {
          url = BaseUrls.EurGbpEn;
          break;
        }
        url = BaseUrls.EurGbpTr;
        break;
      case 'usdCad':
        if (lang === 'en') {
          url = BaseUrls.UsdCadEn;
          break;
        }
        url = BaseUrls.UsdCadTr;
        break;
      case 'nzdUsd':
        if (lang === 'en') {
          url = BaseUrls.NzdUsdEn;
          break;
        }
        url = BaseUrls.NzdUsdTr;
        break;
      case 'xauUsd':
        if (lang === 'en') {
          url = BaseUrls.XauUsdEn;
          break;
        }
        url = BaseUrls.XauUsdTr;
        break;
      case 'xagUsd':
        if (lang === 'en') {
          url = BaseUrls.XagUsdEn;
          break;
        }
        url = BaseUrls.XagUsdTr;
        break;
      default:
        url = BaseUrls.ApplEn;
        break;
    }
    return url;
  };

  base = async (url: string) => {
    const image = await axios.get(url, { responseType: 'arraybuffer' });
    const last = Buffer.from(image.data).toString('base64');
    return last;
  };
}
