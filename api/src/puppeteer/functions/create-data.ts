import { Repository } from 'typeorm';
import { Lookup } from '../entities/lookup.entity';
import { PivotPoint } from '../entities/pivot-points.entity';
import { TechnicalIndicator } from '../entities/tech-indicator.entity';
import { GetData } from './getData';

export async function CreateData(
  id: string,
  url: string,
  pairRepo: Repository<any>,
  lookupRepo: Repository<any>,
  techRepo: Repository<any>,
  pivotRepo: Repository<any>,
): Promise<boolean> {
  try {
    const pair = await pairRepo.findOne({ where: { id: id } });
    console.log('Pair Founded');
    const lookUp = new Lookup();
    lookUp.pair = pair;
    lookUp.timeStamp = new Date();
    lookupRepo.create(lookUp);
    await lookupRepo.save(lookUp);
    console.log('Lookup Created');
    const result = await GetData(url);
    for (let i = 0; i < result.tables[0].tableRows.length; i++) {
      const pivot = new PivotPoint();
      pivot.name = result.tables[0].tableRows[i][0];
      pivot.s3 = result.tables[0].tableRows[i][1];
      pivot.s2 = result.tables[0].tableRows[i][2];
      pivot.s1 = result.tables[0].tableRows[i][3];
      pivot.pivotPoint = result.tables[0].tableRows[i][4];
      pivot.r1 = result.tables[0].tableRows[i][5];
      pivot.r2 = result.tables[0].tableRows[i][6];
      pivot.r3 = result.tables[0].tableRows[i][7];
      pivot.lookup = lookUp;
      pivotRepo.create(pivot);
      await pivotRepo.save(pivot);
      console.log('Pivots created');
    }
    for (let i = 0; i < result.tables[1].tableRows.length; i++) {
      const techAnalysis = new TechnicalIndicator();
      techAnalysis.name = result.tables[1].tableRows[i][0];
      techAnalysis.value = result.tables[1].tableRows[i][1];
      techAnalysis.action = result.tables[1].tableRows[i][2];
      techAnalysis.lookup = lookUp;
      techRepo.create(techAnalysis);
      await techRepo.save(techAnalysis);
      console.log('analysis created ');
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
