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
const indice_entity_1 = require("./entities/indice.entity");
const lookup_entinty_1 = require("./entities/lookup.entinty");
const news_entity_1 = require("./entities/news.entity");
const createNews_1 = require("./functions/createNews");
const getCryptoNews_1 = require("./functions/getCryptoNews");
const getNews_1 = require("./functions/getNews");
const schedule_1 = require("@nestjs/schedule");
const dist_1 = require("@nestjs/schedule/dist");
let PuppeteerService = class PuppeteerService {
    constructor(lookupRepo, indiceRepo, newsRepo) {
        this.lookupRepo = lookupRepo;
        this.indiceRepo = indiceRepo;
        this.newsRepo = newsRepo;
    }
    async refreshDb(alias) {
        const entity = await this.indiceRepo
            .createQueryBuilder('indice')
            .where('indice.alias =:alias', { alias: alias })
            .getOne();
        const last = entity.source.map(async (url) => {
            if (url.includes('crypto')) {
                const data = await (0, getCryptoNews_1.GetCryptoNews)(url);
                const result = await (0, createNews_1.CreateNews)(data, entity.alias, this.indiceRepo, this.newsRepo, this.lookupRepo);
                return result;
            }
            else {
                const data = await (0, getNews_1.GetNews)(url);
                const result = await (0, createNews_1.CreateNews)(data, entity.alias, this.indiceRepo, this.newsRepo, this.lookupRepo);
                return result;
            }
        });
        return last;
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
    async cronJob() {
        const firstLookup = await this.lookupRepo.find({
            order: { timeStamp: 'ASC' },
            relations: {
                indice: true,
            },
            select: ['id', 'timeStamp', 'language', 'indice'],
        });
        let url;
        const { indice } = firstLookup[0];
        if (firstLookup[0].language === 'en') {
            const enURL = indice.source.filter((url) => url.includes('www'))[0];
            url = enURL;
        }
        else {
            const trURL = indice.source.filter((url) => url.includes('tr'))[0];
            url = trURL;
        }
        try {
            if (url.includes('crypto')) {
                console.log('crypto', url);
                const data = await (0, getCryptoNews_1.GetCryptoNews)(url);
                const result = await (0, createNews_1.CreateNews)(data, indice.alias, this.indiceRepo, this.newsRepo, this.lookupRepo);
            }
            else {
                console.log('currencies', url);
                const data = await (0, getNews_1.GetNews)(url);
                const result = await (0, createNews_1.CreateNews)(data, indice.alias, this.indiceRepo, this.newsRepo, this.lookupRepo);
            }
            const news = await this.newsRepo
                .createQueryBuilder('news')
                .where('news.lookupId =:lookupId', { lookupId: firstLookup[0].id })
                .getMany();
            this.newsRepo.remove(news);
            this.lookupRepo.remove(firstLookup[0]);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
};
__decorate([
    (0, schedule_1.Cron)(dist_1.CronExpression.EVERY_10_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PuppeteerService.prototype, "cronJob", null);
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