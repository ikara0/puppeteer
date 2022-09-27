import { Injectable } from '@nestjs/common';
import { BaseUrls } from './constants/baseUrls.contants';

import { GetNews } from './functions/getNews';

@Injectable()
export class PuppeteerService {
  constructor() {}

  async getRawNewsAppl() {
    const result = await GetNews(BaseUrls.ApplEn);
    return result;
  }
}
