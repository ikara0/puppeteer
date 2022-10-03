import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import {
  BaseCryptoUrls,
  BaseCurrenciesUrls,
} from './constants/baseUrls.contants';
import { Indice } from './entities/indice.entity';
import { Lookup } from './entities/lookup.entinty';
import { News } from './entities/news.entity';
import { CreateCurrencieNews } from './functions/createCurrencieNews';
import { GetCryptoNews } from './functions/getCryptoNews';

import { GetNews } from './functions/getNews';

@Injectable()
export class PuppeteerService {
  constructor(
    @InjectRepository(Lookup) private lookupRepo: Repository<Lookup>,
    @InjectRepository(Indice) private indiceRepo: Repository<Indice>,
    @InjectRepository(News) private newsRepo: Repository<News>,
  ) {}
  async createNewsForCrypto() {
    for (const item of Object.keys(BaseCryptoUrls)) {
      const url: string = BaseCryptoUrls[item];
      const result = await GetCryptoNews(url);
      console.log(result);
    }
    return true;
  }

  async refreshCurrenciesNews() {
    const alias = this.indiceRepo
      .createQueryBuilder('news')
      .select('news.alias')
      .getMany();

    //TODO

    for (let i = 0; i < Object.keys(BaseCurrenciesUrls).length; i++) {
      console.log(BaseCurrenciesUrls[i].value);
    }
    return alias;
  }

  async createNewsByAliasAndLang(alias: string, lang: string) {
    const url = this.setUrl(alias, lang);

    const data = await GetNews(url);

    const result = await CreateCurrencieNews(
      data,
      alias,
      this.indiceRepo,
      this.newsRepo,
      this.lookupRepo,
    );
    return result;

    // try {
    //   const exist = await this.indiceRepo.findOne({ where: { alias: alias } });
    //   if (exist) {
    //     const lookup = new Lookup();
    //     lookup.language = result.lang;
    //     lookup.indice = exist;
    //     lookup.timeStamp = new Date();
    //     const lookupResult = this.lookupRepo.create(lookup);
    //     await this.lookupRepo.save(lookupResult);
    //     console.log('lookup kaydedildi');
    //     for (const item of result.news) {
    //       const news = new News();
    //       // let lastImg = await this.base(item.sumImgSrc);
    //       // news.sumImgURL = `data:image/jpeg;base64,${lastImg}`;
    //       news.lookup = lookupResult;
    //       news.title = item.title;
    //       news.spot = item.spot;
    //       news.content = item.content;
    //       news.order = item.order;
    //       const newsResult = this.newsRepo.create(news);
    //       await this.newsRepo.save(newsResult);
    //       console.log('news Kaydedildi');
    //     }
    //     return true;
    //   }
    //   const newsAlias: string = result.IndiceName.split(' ')[0];
    //   const index = new Indice();
    //   index.name = result.indiceName;
    //   index.alias = newsAlias.toLocaleLowerCase();
    //   const indexResult = this.indiceRepo.create(index);
    //   await this.indiceRepo.save(indexResult);
    //   console.log('index kaydedildi');

    //   const lookup = new Lookup();
    //   lookup.language = result.lang;
    //   lookup.indice = indexResult;
    //   lookup.timeStamp = new Date();
    //   const lookupResult = this.lookupRepo.create(lookup);
    //   await this.lookupRepo.save(lookupResult);
    //   console.log('lookup kaydedildi');

    //   for (const item of result.news) {
    //     const news = new News();
    //     // let lastImg = await this.base(item.sumImgSrc);
    //     // news.sumImgURL = `data:image/jpeg;base64,${lastImg}`;
    //     news.lookup = lookupResult;
    //     news.title = item.title;
    //     news.spot = item.spot;
    //     news.content = item.content;
    //     news.order = item.order;

    //     const newsResult = this.newsRepo.create(news);
    //     await this.newsRepo.save(newsResult);
    //     console.log('news Kaydedildi');
    //   }

    //   return true;
    // } catch (error) {
    //   console.log(error);
    //   return false;
    // }
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
          url = BaseCurrenciesUrls.ApplEn;
          break;
        }
        url = BaseCurrenciesUrls.ApplTr;
        break;
      case 'dow':
        if (lang === 'en') {
          url = BaseCurrenciesUrls.DowJonesEn;
          break;
        }
        url = BaseCurrenciesUrls.DowJonseTr;
        break;
      case 'eurUsd':
        if (lang === 'en') {
          url = BaseCurrenciesUrls.EurUsdEn;
          break;
        }
        url = BaseCurrenciesUrls.EurUsdTr;
        break;
      case 'gbpUsd':
        if (lang === 'en') {
          url = BaseCurrenciesUrls.GbpUsdEn;
          break;
        }
        url = BaseCurrenciesUrls.GbpUsdTr;
        break;
      case 'usdJpy':
        if (lang === 'en') {
          url = BaseCurrenciesUrls.UsdJpyEn;
          break;
        }
        url = BaseCurrenciesUrls.UsdJpyTr;
        break;
      case 'usdChf':
        if (lang === 'en') {
          url = BaseCurrenciesUrls.UsdChfEn;
          break;
        }
        url = BaseCurrenciesUrls.UsdChfTr;
        break;
      case 'audUsd':
        if (lang === 'en') {
          url = BaseCurrenciesUrls.AudUsdEn;
          break;
        }
        url = BaseCurrenciesUrls.AudUsdTr;
        break;
      case 'eurGbp':
        if (lang === 'en') {
          url = BaseCurrenciesUrls.EurGbpEn;
          break;
        }
        url = BaseCurrenciesUrls.EurGbpTr;
        break;
      case 'usdCad':
        if (lang === 'en') {
          url = BaseCurrenciesUrls.UsdCadEn;
          break;
        }
        url = BaseCurrenciesUrls.UsdCadTr;
        break;
      case 'nzdUsd':
        if (lang === 'en') {
          url = BaseCurrenciesUrls.NzdUsdEn;
          break;
        }
        url = BaseCurrenciesUrls.NzdUsdTr;
        break;
      case 'xauUsd':
        if (lang === 'en') {
          url = BaseCurrenciesUrls.XauUsdEn;
          break;
        }
        url = BaseCurrenciesUrls.XauUsdTr;
        break;
      case 'xagUsd':
        if (lang === 'en') {
          url = BaseCurrenciesUrls.XagUsdEn;
          break;
        }
        url = BaseCurrenciesUrls.XagUsdTr;
        break;
      default:
        url = BaseCurrenciesUrls.ApplEn;
        break;
    }
    return url;
  };
}
