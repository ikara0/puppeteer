"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PuppeteerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const baseUrls_contants_1 = require("./constants/baseUrls.contants");
const indice_entity_1 = require("./entities/indice.entity");
const lookup_entinty_1 = require("./entities/lookup.entinty");
const news_entity_1 = require("./entities/news.entity");
const getNews_1 = require("./functions/getNews");
let PuppeteerService = class PuppeteerService {
    constructor(lookupRepo, indiceRepo, newsRepo) {
        this.lookupRepo = lookupRepo;
        this.indiceRepo = indiceRepo;
        this.newsRepo = newsRepo;
    }
    async createEnNewsForApple(apple) {
        const result = await (0, getNews_1.GetNews)(baseUrls_contants_1.BaseUrls.ApplEn);
        try {
            const exist = await this.indiceRepo.findOne({ where: { alias: apple } });
            if (exist) {
                const lookup = new lookup_entinty_1.Lookup();
                lookup.language = result.Lang;
                lookup.indice = exist;
                lookup.timeStamp = new Date();
                const lookupResult = this.lookupRepo.create(lookup);
                await this.lookupRepo.save(lookupResult);
                console.log('lookup kaydedildi');
                for (const item of result.TotalNews) {
                    const news = new news_entity_1.News();
                    news.lookup = lookupResult;
                    news.title = item.news.title;
                    news.spot = item.news.spot;
                    news.content = item.news.context;
                    news.order = item.news.order;
                    const newsResult = this.newsRepo.create(news);
                    await this.newsRepo.save(newsResult);
                    console.log('news Kaydedildi');
                }
                return true;
            }
            const alias = result.IndiceName.split(' ')[0];
            const index = new indice_entity_1.Indice();
            index.name = result.IndiceName;
            index.alias = alias.toLocaleLowerCase();
            const indexResult = this.indiceRepo.create(index);
            await this.indiceRepo.save(indexResult);
            console.log('index kaydedildi');
            const lookup = new lookup_entinty_1.Lookup();
            lookup.language = result.Lang;
            lookup.indice = indexResult;
            lookup.timeStamp = new Date();
            const lookupResult = this.lookupRepo.create(lookup);
            await this.lookupRepo.save(lookupResult);
            console.log('lookup kaydedildi');
            for (const item of result.TotalNews) {
                const news = new news_entity_1.News();
                news.lookup = lookupResult;
                news.title = item.news.title;
                news.spot = item.news.spot;
                news.content = item.news.context;
                news.order = item.news.order;
                const newsResult = this.newsRepo.create(news);
                await this.newsRepo.save(newsResult);
                console.log('news Kaydedildi');
            }
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    async createTrNewsForApple(apple) {
        const result = await (0, getNews_1.GetNews)(baseUrls_contants_1.BaseUrls.ApplTr);
        try {
            const exist = await this.indiceRepo.findOne({ where: { alias: apple } });
            if (exist) {
                const lookup = new lookup_entinty_1.Lookup();
                lookup.language = result.Lang;
                lookup.indice = exist;
                lookup.timeStamp = new Date();
                const lookupResult = this.lookupRepo.create(lookup);
                await this.lookupRepo.save(lookupResult);
                console.log('lookup kaydedildi');
                for (const item of result.TotalNews) {
                    const news = new news_entity_1.News();
                    news.lookup = lookupResult;
                    news.title = item.news.title;
                    news.spot = item.news.spot;
                    news.content = item.news.context;
                    news.order = item.news.order;
                    const newsResult = this.newsRepo.create(news);
                    await this.newsRepo.save(newsResult);
                    console.log('news Kaydedildi');
                }
                return true;
            }
            const alias = result.IndiceName.split(' ')[0];
            const index = new indice_entity_1.Indice();
            index.name = result.IndiceName;
            index.alias = alias.toLocaleLowerCase();
            const indexResult = this.indiceRepo.create(index);
            await this.indiceRepo.save(indexResult);
            console.log('index kaydedildi');
            const lookup = new lookup_entinty_1.Lookup();
            lookup.language = result.Lang;
            lookup.indice = indexResult;
            lookup.timeStamp = new Date();
            const lookupResult = this.lookupRepo.create(lookup);
            await this.lookupRepo.save(lookupResult);
            console.log('lookup kaydedildi');
            for (const item of result.TotalNews) {
                const news = new news_entity_1.News();
                news.lookup = lookupResult;
                news.title = item.news.title;
                news.spot = item.news.spot;
                news.content = item.news.context;
                news.order = item.news.order;
                const newsResult = this.newsRepo.create(news);
                await this.newsRepo.save(newsResult);
                console.log('news Kaydedildi');
            }
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    async getNewsByAlias(alias, lang) {
        const indice = await this.indiceRepo.findOne({ where: { alias: alias } });
        if (!indice) {
            return null;
        }
        console.log('indice bulundu');
        console.log(indice);
        const lookup = await this.lookupRepo
            .createQueryBuilder('lookup')
            .where('lookup.indiceId =:indiceId', { indiceId: indice.id })
            .andWhere('lookup.language =:language', { language: lang })
            .orderBy('lookup.timeStamp', 'DESC')
            .getOne();
        console.log('lookup bulundu');
        console.log(lookup);
        const news = await this.newsRepo
            .createQueryBuilder('news')
            .where('news.lookupId =:lookupId', { lookupId: lookup.id })
            .orderBy('news.order', 'ASC')
            .getMany();
        console.log('news bulundu');
        const result = {
            indiceName: indice.name,
            time: lookup.timeStamp,
            language: lookup.language,
            news: news,
        };
        return result;
    }
    async createEnNewsForDow(dow) {
        const result = await (0, getNews_1.GetNews)(baseUrls_contants_1.BaseUrls.DowJonesEn);
        try {
            const exist = await this.indiceRepo.findOne({ where: { alias: dow } });
            if (exist) {
                const lookup = new lookup_entinty_1.Lookup();
                lookup.language = result.Lang;
                lookup.indice = exist;
                lookup.timeStamp = new Date();
                const lookupResult = this.lookupRepo.create(lookup);
                await this.lookupRepo.save(lookupResult);
                console.log('lookup kaydedildi');
                for (const item of result.TotalNews) {
                    const news = new news_entity_1.News();
                    news.lookup = lookupResult;
                    news.title = item.news.title;
                    news.spot = item.news.spot;
                    news.content = item.news.context;
                    news.order = item.news.order;
                    const newsResult = this.newsRepo.create(news);
                    await this.newsRepo.save(newsResult);
                    console.log('news Kaydedildi');
                }
                return true;
            }
            const alias = result.IndiceName.split(' ')[0];
            const index = new indice_entity_1.Indice();
            index.name = result.IndiceName;
            index.alias = alias.toLocaleLowerCase();
            const indexResult = this.indiceRepo.create(index);
            await this.indiceRepo.save(indexResult);
            console.log('index kaydedildi');
            const lookup = new lookup_entinty_1.Lookup();
            lookup.language = result.Lang;
            lookup.indice = indexResult;
            lookup.timeStamp = new Date();
            const lookupResult = this.lookupRepo.create(lookup);
            await this.lookupRepo.save(lookupResult);
            console.log('lookup kaydedildi');
            for (const item of result.TotalNews) {
                const news = new news_entity_1.News();
                news.lookup = lookupResult;
                news.title = item.news.title;
                news.spot = item.news.spot;
                news.content = item.news.context;
                news.order = item.news.order;
                const newsResult = this.newsRepo.create(news);
                await this.newsRepo.save(newsResult);
                console.log('news Kaydedildi');
            }
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    async createTrNewsForDow(dow) {
        const result = await (0, getNews_1.GetNews)(baseUrls_contants_1.BaseUrls.DowJonseTr);
        try {
            const exist = await this.indiceRepo.findOne({ where: { alias: dow } });
            if (exist) {
                const lookup = new lookup_entinty_1.Lookup();
                lookup.language = result.Lang;
                lookup.indice = exist;
                lookup.timeStamp = new Date();
                const lookupResult = this.lookupRepo.create(lookup);
                await this.lookupRepo.save(lookupResult);
                console.log('lookup kaydedildi');
                for (const item of result.TotalNews) {
                    const news = new news_entity_1.News();
                    news.lookup = lookupResult;
                    news.title = item.news.title;
                    news.spot = item.news.spot;
                    news.content = item.news.context;
                    news.order = item.news.order;
                    const newsResult = this.newsRepo.create(news);
                    await this.newsRepo.save(newsResult);
                    console.log('news Kaydedildi');
                }
                return true;
            }
            const alias = result.IndiceName.split(' ')[0];
            const index = new indice_entity_1.Indice();
            index.name = result.IndiceName;
            index.alias = alias.toLocaleLowerCase();
            const indexResult = this.indiceRepo.create(index);
            await this.indiceRepo.save(indexResult);
            console.log('index kaydedildi');
            const lookup = new lookup_entinty_1.Lookup();
            lookup.language = result.Lang;
            lookup.indice = indexResult;
            lookup.timeStamp = new Date();
            const lookupResult = this.lookupRepo.create(lookup);
            await this.lookupRepo.save(lookupResult);
            console.log('lookup kaydedildi');
            for (const item of result.TotalNews) {
                const news = new news_entity_1.News();
                news.lookup = lookupResult;
                news.title = item.news.title;
                news.spot = item.news.spot;
                news.content = item.news.context;
                news.order = item.news.order;
                const newsResult = this.newsRepo.create(news);
                await this.newsRepo.save(newsResult);
                console.log('news Kaydedildi');
            }
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
};
PuppeteerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lookup_entinty_1.Lookup)),
    __param(1, (0, typeorm_1.InjectRepository)(indice_entity_1.Indice)),
    __param(2, (0, typeorm_1.InjectRepository)(news_entity_1.News)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PuppeteerService);
exports.PuppeteerService = PuppeteerService;
//# sourceMappingURL=puppeteer.service.js.map