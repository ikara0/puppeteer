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
const pair_entity_1 = require("./entities/pair.entity");
const baseUrls_contants_1 = require("./constants/baseUrls.contants");
const create_pair_1 = require("./functions/create-pair");
const pivot_points_entity_1 = require("./entities/pivot-points.entity");
const lookup_entity_1 = require("./entities/lookup.entity");
const pair_pivots_dto_1 = require("./dtos/pair-pivots.dto");
const tech_indicator_entity_1 = require("./entities/tech-indicator.entity");
const create_data_1 = require("./functions/create-data");
const getNews_1 = require("./functions/getNews");
let PuppeteerService = class PuppeteerService {
    constructor(pairRepo, lookupRepo, pivotRepo, techRepo) {
        this.pairRepo = pairRepo;
        this.lookupRepo = lookupRepo;
        this.pivotRepo = pivotRepo;
        this.techRepo = techRepo;
    }
    async refreshAllTechnical() {
        try {
            await this.createTechAnalysisForBtcUsd(baseUrls_contants_1.BaseUrls.BtcUsdId);
            await this.createTechAnalysisForEurUsd(baseUrls_contants_1.BaseUrls.EurUsdId);
            await this.createTechAnalysisForUsdTry(baseUrls_contants_1.BaseUrls.UsdTryId);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    async createTechAnalysisForEurUsd(id) {
        const result = await (0, create_data_1.CreateData)(id, baseUrls_contants_1.BaseUrls.EurUsdTechnical, this.pairRepo, this.lookupRepo, this.techRepo, this.pivotRepo);
        if (result) {
            return true;
        }
        return false;
    }
    async createTechAnalysisForBtcUsd(id) {
        const result = await (0, create_data_1.CreateData)(id, baseUrls_contants_1.BaseUrls.BtcUsdTechnical, this.pairRepo, this.lookupRepo, this.techRepo, this.pivotRepo);
        if (result) {
            return true;
        }
        return false;
    }
    async createTechAnalysisForUsdTry(id) {
        const result = await (0, create_data_1.CreateData)(id, baseUrls_contants_1.BaseUrls.UsdTryTechnical, this.pairRepo, this.lookupRepo, this.techRepo, this.pivotRepo);
        if (result) {
            return true;
        }
        return false;
    }
    async deneme() {
        const result = await (0, getNews_1.GetNews)('https://www.investing.com/indices/us-spx-500-futures-news?cid=1175153');
        return result;
    }
    async getAnalysisByPairId(id) {
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
        const pairPivots = new pair_pivots_dto_1.PairPivot();
        pairPivots.pair = pair.name;
        pairPivots.description = pair.description;
        pairPivots.timeStamp = currentLookup.timeStamp;
        pairPivots.pivots = pivots;
        pairPivots.technical = tech;
        return pairPivots;
    }
    async createPairs() {
        try {
            const eurUsd = await (0, create_pair_1.CreatePair)(baseUrls_contants_1.BaseUrls.EurUsdTechnical, baseUrls_contants_1.BaseUrls.PairNameDescription, this.pairRepo);
            const btcUsd = await (0, create_pair_1.CreatePair)(baseUrls_contants_1.BaseUrls.BtcUsdTechnical, baseUrls_contants_1.BaseUrls.PairNameDescription, this.pairRepo);
            const usdTry = await (0, create_pair_1.CreatePair)(baseUrls_contants_1.BaseUrls.UsdTryTechnical, baseUrls_contants_1.BaseUrls.PairNameDescription, this.pairRepo);
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
    __param(0, (0, typeorm_1.InjectRepository)(pair_entity_1.Pair)),
    __param(1, (0, typeorm_1.InjectRepository)(lookup_entity_1.Lookup)),
    __param(2, (0, typeorm_1.InjectRepository)(pivot_points_entity_1.PivotPoint)),
    __param(3, (0, typeorm_1.InjectRepository)(tech_indicator_entity_1.TechnicalIndicator)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PuppeteerService);
exports.PuppeteerService = PuppeteerService;
//# sourceMappingURL=puppeteer.service.js.map