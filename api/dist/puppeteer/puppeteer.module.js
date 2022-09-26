"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PuppeteerModule = void 0;
const common_1 = require("@nestjs/common");
const puppeteer_service_1 = require("./puppeteer.service");
const puppeteer_controller_1 = require("./puppeteer.controller");
const typeorm_1 = require("@nestjs/typeorm");
const pair_entity_1 = require("./entities/pair.entity");
const pivot_points_entity_1 = require("./entities/pivot-points.entity");
const lookup_entity_1 = require("./entities/lookup.entity");
const tech_indicator_entity_1 = require("./entities/tech-indicator.entity");
let PuppeteerModule = class PuppeteerModule {
};
PuppeteerModule = __decorate([
    (0, common_1.Module)({
        providers: [puppeteer_service_1.PuppeteerService],
        controllers: [puppeteer_controller_1.PuppeteerController],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([pair_entity_1.Pair, pivot_points_entity_1.PivotPoint, lookup_entity_1.Lookup, tech_indicator_entity_1.TechnicalIndicator]),
        ],
    })
], PuppeteerModule);
exports.PuppeteerModule = PuppeteerModule;
//# sourceMappingURL=puppeteer.module.js.map