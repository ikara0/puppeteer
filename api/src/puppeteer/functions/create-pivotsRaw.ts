import * as ppt from 'puppeteer';
export async function CreatePivotsRaw(
  url: string,
  tableInfo: string,
): Promise<string[]> {
  try {
    return await (async () => {
      const browser = await ppt.launch();
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle2' });
      const data = await page.$x(tableInfo);
      const value = await page.evaluate((el) => el.textContent, data[0]);
      const content = value.replace(/\t/g, ' ').split(/\n/);
      const pivotsRaw = content.filter((el) => el);
      await browser.close();
      return pivotsRaw;
    })();
  } catch (error) {
    console.log(error);
  }
}
