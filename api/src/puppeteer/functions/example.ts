import { BaseUrls } from '../constants/baseUrls.contants';
import { PivotPoint } from '../entities/pivot-points.entity';
import { GetData } from './getData';

export async function Example(repo: any) {
  const result = await GetData(BaseUrls.BtcUsdTechnical);
  const ppointTable = result.tables.filter(
    (t) => t.tableTitle === 'Pivot Points',
  );

  const pivotsRaw = ppointTable.map((item) => item.tableRows);

  const head = ppointTable.map((item) => item.tableHeads);
  const arr: any = [];
  pivotsRaw[0].map((item) => {
    const obj: any = {};
    head[0].map((key, i) => {
      key = key[0].toLowerCase() + key.slice(1);
      if (key === 'pivot Points') {
        key = key.split(' ').join('');
      }
      obj[key] = item[i];
    });
    arr.push(obj);
  });

  return result;
}
