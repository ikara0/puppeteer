import * as ppt from 'puppeteer';
import { Repository } from 'typeorm';
import { Pair } from '../entities/pair.entity';

export async function CreatePair(
  url: string,
  place: string,
  repo: Repository<any>,
) {
  try {
    return await (async () => {
      const browser = await ppt.launch();
      const page = await browser.newPage();
      await page.goto(url, {
        waitUntil: 'networkidle2',
      });
      const data = await page.$x(place);
      const value = await page.evaluate((el) => el.textContent, data[0]);
      const header = value.split('-');
      const param = new Pair();
      param.name = header[0];
      param.description = header[1];
      const result = repo.create(param);
      return repo.save(result);
    })();
  } catch (error) {
    console.log(error);
    return false;
  }
}
