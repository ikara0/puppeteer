"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTechAnalysis = void 0;
const ppt = require("puppeteer");
async function CreateTechAnalysis(url, pivotTable) {
    try {
        return await (async () => {
            const rawData = { tech: {}, pivots: [] };
            const browser = await ppt.launch();
            const page = await browser.newPage();
            await page.goto(url, { waitUntil: 'networkidle2' });
            const data = await page.$x(pivotTable);
            const value = await page.evaluate((el) => el.textContent, data[0]);
            const content = value.replace(/\t/g, ' ').split(/\n/);
            const pivotsRaw = content.filter((el) => el);
            rawData.pivots = pivotsRaw;
            const lastData = [];
            for (let i = 1; i <= 12; i++) {
                const element = {};
                for (let a = 1; a <= 3; a++) {
                    const data = await page.$x(`/html/body/div[5]/section/div[10]/div[3]/table/tbody/tr[${i}]/td[${a}]`);
                    const head = await page.evaluate((el) => el.textContent, data[0]);
                    const content = head.toString().split(/\n/);
                    const value = content.filter((el) => el).toString();
                    if (a == 1) {
                        element.Name = value;
                    }
                    if (a == 2) {
                        element.Value = value;
                    }
                    if (a == 3) {
                        element.Action = value;
                    }
                }
                lastData.push(element);
            }
            rawData.tech.techData = lastData;
            const summaryData = await page.$x(`/html/body/div[5]/section/div[10]/div[3]/table/tbody/tr[13]/td`);
            const head = await page.evaluate((el) => el.textContent, summaryData[0]);
            const summaryContent = head.toString().split(/\n/);
            const summ = summaryContent.filter((el) => el);
            const summList = [];
            for (let el of summ) {
                const element = {};
                const summaryData = el.split(':');
                element.key = summaryData[0];
                element.value = summaryData[1];
                summList.push(element);
            }
            rawData.tech.summary = summList;
            await browser.close();
            return rawData;
        })();
    }
    catch (error) {
        console.log(error);
    }
}
exports.CreateTechAnalysis = CreateTechAnalysis;
//# sourceMappingURL=create-techAnalysis.js.map