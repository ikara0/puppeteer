"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePair = void 0;
const ppt = require("puppeteer");
const pair_entity_1 = require("../entities/pair.entity");
async function CreatePair(url, place, repo) {
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
            const param = new pair_entity_1.Pair();
            param.name = header[0];
            param.description = header[1];
            const result = repo.create(param);
            return repo.save(result);
        })();
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.CreatePair = CreatePair;
//# sourceMappingURL=create-pair.js.map