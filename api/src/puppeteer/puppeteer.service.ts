import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Pair } from './entities/pair.entity';
import { BaseUrls } from './constants/baseUrls.contants';
import { CreatePair } from './functions/create-pair';
import { PivotPoint } from './entities/pivot-points.entity';
import { Lookup } from './entities/lookup.entity';
import { PairPivot } from './dtos/pair-pivots.dto';
import { TechnicalIndicator } from './entities/tech-indicator.entity';
import { CreateData } from './functions/create-data';
import { GetData } from './functions/getData';
import { Example } from './functions/example';
import { GetNews } from './functions/getNews';
import { TotalNews } from './functions/getTotalNews';

@Injectable()
export class PuppeteerService {
  constructor(
    @InjectRepository(Pair) private pairRepo: Repository<Pair>,
    @InjectRepository(Lookup) private lookupRepo: Repository<Lookup>,
    @InjectRepository(PivotPoint) private pivotRepo: Repository<PivotPoint>,
    @InjectRepository(TechnicalIndicator)
    private techRepo: Repository<TechnicalIndicator>,
  ) {}

  async refreshAllTechnical(): Promise<boolean> {
    try {
      await this.createTechAnalysisForBtcUsd(BaseUrls.BtcUsdId);
      await this.createTechAnalysisForEurUsd(BaseUrls.EurUsdId);
      await this.createTechAnalysisForUsdTry(BaseUrls.UsdTryId);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async createTechAnalysisForEurUsd(id: string): Promise<boolean> {
    const result = await CreateData(
      id,
      BaseUrls.EurUsdTechnical,
      this.pairRepo,
      this.lookupRepo,
      this.techRepo,
      this.pivotRepo,
    );
    if (result) {
      return true;
    }
    return false;
  }
  async createTechAnalysisForBtcUsd(id: string): Promise<boolean> {
    const result = await CreateData(
      id,
      BaseUrls.BtcUsdTechnical,
      this.pairRepo,
      this.lookupRepo,
      this.techRepo,
      this.pivotRepo,
    );
    if (result) {
      return true;
    }
    return false;
  }
  async createTechAnalysisForUsdTry(id: string): Promise<boolean> {
    const result = await CreateData(
      id,
      BaseUrls.UsdTryTechnical,
      this.pairRepo,
      this.lookupRepo,
      this.techRepo,
      this.pivotRepo,
    );
    if (result) {
      return true;
    }
    return false;
  }

  async deneme() {
    const result = await GetNews(
      'https://www.investing.com/indices/us-spx-500-futures-news?cid=1175153',
    );
    // console.log(result);
    return result;
  }

  async getAnalysisByPairId(id: string) {
    const pair = await this.pairRepo.findOne({ where: { id: id } });
    console.log(pair);
    const currentLookup = await this.lookupRepo
      .createQueryBuilder('lookup')
      .where('lookup.pairId =:pairId', {
        pairId: pair.id,
      })
      .orderBy('lookup.timeStamp', 'DESC')
      .getOne();

    console.log(currentLookup);
    const pivots = await this.pivotRepo.find({
      where: {
        lookup: {
          id: currentLookup.id,
        },
      },
      select: ['name', 's3', 's2', 's1', 'pivotPoint', 'r1', 'r2', 'r3'],
    });
    console.log(pivots);
    const tech = await this.techRepo.find({
      where: {
        lookup: {
          id: currentLookup.id,
        },
      },
      select: ['name', 'value', 'action'],
    });
    console.log(tech);
    const pairPivots = new PairPivot();
    pairPivots.pair = pair.name;
    pairPivots.description = pair.description;
    pairPivots.timeStamp = currentLookup.timeStamp;
    pairPivots.pivots = pivots;
    pairPivots.technical = tech;

    return pairPivots;
  }
  async createPairs(): Promise<boolean> {
    try {
      const eurUsd = await CreatePair(
        BaseUrls.EurUsdTechnical,
        BaseUrls.PairNameDescription,
        this.pairRepo,
      );
      const btcUsd = await CreatePair(
        BaseUrls.BtcUsdTechnical,
        BaseUrls.PairNameDescription,
        this.pairRepo,
      );
      const usdTry = await CreatePair(
        BaseUrls.UsdTryTechnical,
        BaseUrls.PairNameDescription,
        this.pairRepo,
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  // async setData(
  //   arr: string[],
  //   first: number,
  //   end: number,
  //   lookUp: Lookup,
  //   repo: Repository<any>,
  // ) {
  //   const newArray = arr.slice(first, end);
  //   const data = new PivotPoint();
  //   data.name = newArray[0];
  //   data.s3 = newArray[1];
  //   data.s2 = newArray[2];
  //   data.s1 = newArray[3];
  //   data.pivotPoint = newArray[4];
  //   data.r1 = newArray[5];
  //   data.r2 = newArray[6];
  //   data.r3 = newArray[7];
  //   data.lookup = lookUp;
  //   await repo.create(data);
  //   await repo.save(data);
  //   console.log(data);
  // }
}
