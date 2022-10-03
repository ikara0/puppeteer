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
const createCurrencieNews_1 = require("./functions/createCurrencieNews");
const getCryptoNews_1 = require("./functions/getCryptoNews");
const getNews_1 = require("./functions/getNews");
let PuppeteerService = class PuppeteerService {
    constructor(lookupRepo, indiceRepo, newsRepo) {
        this.lookupRepo = lookupRepo;
        this.indiceRepo = indiceRepo;
        this.newsRepo = newsRepo;
        this.setUrl = (alias, lang) => {
            let url = '';
            switch (alias) {
                case 'apple':
                    if (lang === 'en') {
                        url = baseUrls_contants_1.BaseCurrenciesUrls.ApplEn;
                        break;
                    }
                    url = baseUrls_contants_1.BaseCurrenciesUrls.ApplTr;
                    break;
                case 'dow':
                    if (lang === 'en') {
                        url = baseUrls_contants_1.BaseCurrenciesUrls.DowJonesEn;
                        break;
                    }
                    url = baseUrls_contants_1.BaseCurrenciesUrls.DowJonseTr;
                    break;
                case 'eurUsd':
                    if (lang === 'en') {
                        url = baseUrls_contants_1.BaseCurrenciesUrls.EurUsdEn;
                        break;
                    }
                    url = baseUrls_contants_1.BaseCurrenciesUrls.EurUsdTr;
                    break;
                case 'gbpUsd':
                    if (lang === 'en') {
                        url = baseUrls_contants_1.BaseCurrenciesUrls.GbpUsdEn;
                        break;
                    }
                    url = baseUrls_contants_1.BaseCurrenciesUrls.GbpUsdTr;
                    break;
                case 'usdJpy':
                    if (lang === 'en') {
                        url = baseUrls_contants_1.BaseCurrenciesUrls.UsdJpyEn;
                        break;
                    }
                    url = baseUrls_contants_1.BaseCurrenciesUrls.UsdJpyTr;
                    break;
                case 'usdChf':
                    if (lang === 'en') {
                        url = baseUrls_contants_1.BaseCurrenciesUrls.UsdChfEn;
                        break;
                    }
                    url = baseUrls_contants_1.BaseCurrenciesUrls.UsdChfTr;
                    break;
                case 'audUsd':
                    if (lang === 'en') {
                        url = baseUrls_contants_1.BaseCurrenciesUrls.AudUsdEn;
                        break;
                    }
                    url = baseUrls_contants_1.BaseCurrenciesUrls.AudUsdTr;
                    break;
                case 'eurGbp':
                    if (lang === 'en') {
                        url = baseUrls_contants_1.BaseCurrenciesUrls.EurGbpEn;
                        break;
                    }
                    url = baseUrls_contants_1.BaseCurrenciesUrls.EurGbpTr;
                    break;
                case 'usdCad':
                    if (lang === 'en') {
                        url = baseUrls_contants_1.BaseCurrenciesUrls.UsdCadEn;
                        break;
                    }
                    url = baseUrls_contants_1.BaseCurrenciesUrls.UsdCadTr;
                    break;
                case 'nzdUsd':
                    if (lang === 'en') {
                        url = baseUrls_contants_1.BaseCurrenciesUrls.NzdUsdEn;
                        break;
                    }
                    url = baseUrls_contants_1.BaseCurrenciesUrls.NzdUsdTr;
                    break;
                case 'xauUsd':
                    if (lang === 'en') {
                        url = baseUrls_contants_1.BaseCurrenciesUrls.XauUsdEn;
                        break;
                    }
                    url = baseUrls_contants_1.BaseCurrenciesUrls.XauUsdTr;
                    break;
                case 'xagUsd':
                    if (lang === 'en') {
                        url = baseUrls_contants_1.BaseCurrenciesUrls.XagUsdEn;
                        break;
                    }
                    url = baseUrls_contants_1.BaseCurrenciesUrls.XagUsdTr;
                    break;
                default:
                    url = baseUrls_contants_1.BaseCurrenciesUrls.ApplEn;
                    break;
            }
            return url;
        };
    }
    async createNewsForCrypto() {
        for (const item of Object.keys(baseUrls_contants_1.BaseCryptoUrls)) {
            const url = baseUrls_contants_1.BaseCryptoUrls[item];
            const result = await (0, getCryptoNews_1.GetCryptoNews)(url);
            console.log(result);
        }
        return true;
    }
    async refreshCurrenciesNews() {
        const alias = this.indiceRepo
            .createQueryBuilder('news')
            .select('news.alias')
            .getMany();
        for (let i = 0; i < Object.keys(baseUrls_contants_1.BaseCurrenciesUrls).length; i++) {
            console.log(baseUrls_contants_1.BaseCurrenciesUrls[i].value);
        }
        return alias;
    }
    async createNewsByAliasAndLang(alias, lang) {
        const url = this.setUrl(alias, lang);
        const data = await (0, getNews_1.GetNews)(url);
        const result = await (0, createCurrencieNews_1.CreateCurrencieNews)(data, alias, this.indiceRepo, this.newsRepo, this.lookupRepo);
        return result;
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