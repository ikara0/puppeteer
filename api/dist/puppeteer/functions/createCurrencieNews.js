"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base = exports.CreateCurrencieNews = void 0;
const axios_1 = require("axios");
const indice_entity_1 = require("../entities/indice.entity");
const lookup_entinty_1 = require("../entities/lookup.entinty");
const news_entity_1 = require("../entities/news.entity");
async function CreateCurrencieNews(data, alias, indiceRepo, newsRepo, lookupRepo) {
    try {
        const exist = await indiceRepo.findOne({ where: { alias: alias } });
        if (exist) {
            console.log('indice found');
            const lookup = new lookup_entinty_1.Lookup();
            lookup.language = data.lang;
            lookup.indice = exist;
            lookup.timeStamp = new Date();
            const lookupResult = lookupRepo.create(lookup);
            await lookupRepo.save(lookupResult);
            console.log('lookup saved');
            for (const item of data.news) {
                const news = new news_entity_1.News();
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
        const newAlias = data.indiceName.split(' ')[0];
        const index = new indice_entity_1.Indice();
        index.name = data.indiceName;
        index.alias = newAlias.toLocaleLowerCase();
        const indiceResult = indiceRepo.create(index);
        await indiceRepo.save(indiceResult);
        console.log('index kaydedildi');
        const lookup = new lookup_entinty_1.Lookup();
        lookup.language = data.lang;
        lookup.indice = indiceResult;
        lookup.timeStamp = new Date();
        const lookupResult = lookupRepo.create(lookup);
        await lookupRepo.save(lookupResult);
        console.log('lookup kaydedildi');
        for (const item of data.news) {
            const news = new news_entity_1.News();
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
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.CreateCurrencieNews = CreateCurrencieNews;
async function base(url) {
    const image = await axios_1.default.get(url, { responseType: 'arraybuffer' });
    const last = Buffer.from(image.data).toString('base64');
    return last;
}
exports.base = base;
//# sourceMappingURL=createCurrencieNews.js.map