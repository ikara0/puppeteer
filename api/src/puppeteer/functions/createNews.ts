import axios from 'axios';
import { Repository } from 'typeorm';
import { Indice } from '../entities/indice.entity';
import { Lookup } from '../entities/lookup.entinty';
import { News } from '../entities/news.entity';

export async function CreateNews(
  data: any,
  alias: string,
  indiceRepo: Repository<any>,
  newsRepo: Repository<any>,
  lookupRepo: Repository<any>,
) {
  try {
    const exist = await indiceRepo.findOne({ where: { alias: alias } });
    if (exist) {
      console.log('indice found');
      const lookup = new Lookup();
      lookup.language = data.lang;
      lookup.indice = exist;
      lookup.timeStamp = new Date();
      const lookupResult = lookupRepo.create(lookup);
      await lookupRepo.save(lookupResult);
      console.log('lookup saved');

      for (const item of data.news) {
        const news = new News();
        let convertedImg = await base(item.sumImgSrc);
        news.sumImgURL = `data:image/jpeg;base64,${convertedImg}`;
        news.lookup = lookupResult;
        news.title = item.title;
        news.spot = item.spot;
        news.content = item.content;
        news.order = item.order;

        const newsResult = newsRepo.create(news);
        await newsRepo.save(newsResult);
        console.log('news saved');
      }
      return true;
    }
    const indice = new Indice();
    indice.name = data.indiceName;
    indice.alias = alias;
    const indiceResult = indiceRepo.create(indice);
    await indiceRepo.save(indiceResult);
    console.log('index kaydedildi');

    const lookup = new Lookup();
    lookup.language = data.lang;
    lookup.indice = indiceResult;
    lookup.timeStamp = new Date();
    const lookupResult = lookupRepo.create(lookup);
    await lookupRepo.save(lookupResult);
    console.log('lookup kaydedildi');

    for (const item of data.news) {
      const news = new News();
      let convertedImg = await base(item.sumImgSrc);
      news.sumImgURL = `data:image/jpeg;base64,${convertedImg}`;
      news.lookup = lookupResult;
      news.title = item.title;
      news.spot = item.spot;
      news.content = item.content;
      news.order = item.order;

      const newsResult = newsRepo.create(news);
      await newsRepo.save(newsResult);
      console.log('news saved');
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function base(url: string) {
  const image = await axios.get(url, { responseType: 'arraybuffer' });
  const last = Buffer.from(image.data).toString('base64');
  return last;
}
