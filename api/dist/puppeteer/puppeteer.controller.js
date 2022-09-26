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
exports.PuppeteerController = void 0;
const common_1 = require("@nestjs/common");
const puppeteer_service_1 = require("./puppeteer.service");
let PuppeteerController = class PuppeteerController {
    constructor(pptService) {
        this.pptService = pptService;
    }
    createPairs() {
        return this.pptService.createPairs();
    }
    getPivotsById(id) {
        return this.pptService.getAnalysisByPairId(id);
    }
    deneme() {
        return this.pptService.deneme();
    }
    createTechAnalysisForEurUsd(id) {
        return this.pptService.createTechAnalysisForEurUsd(id);
    }
    createTechAnalysisForBtcUsd(id) {
        return this.pptService.createTechAnalysisForBtcUsd(id);
    }
    createTechAnalysisForUsdTry(id) {
        return this.pptService.createTechAnalysisForUsdTry(id);
    }
    refreshAllTechnical() {
        return this.pptService.refreshAllTechnical();
    }
};
__decorate([
    (0, common_1.Post)('/pair'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PuppeteerController.prototype, "createPairs", null);
__decorate([
    (0, common_1.Get)('/technical/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PuppeteerController.prototype, "getPivotsById", null);
__decorate([
    (0, common_1.Get)('/deneme'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PuppeteerController.prototype, "deneme", null);
__decorate([
    (0, common_1.Post)('/tech/create-EurUsd/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PuppeteerController.prototype, "createTechAnalysisForEurUsd", null);
__decorate([
    (0, common_1.Post)('/tech/create-BtcUsd/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PuppeteerController.prototype, "createTechAnalysisForBtcUsd", null);
__decorate([
    (0, common_1.Post)('/tech/create-UsdTry/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PuppeteerController.prototype, "createTechAnalysisForUsdTry", null);
__decorate([
    (0, common_1.Post)('/tech/refresh'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PuppeteerController.prototype, "refreshAllTechnical", null);
PuppeteerController = __decorate([
    (0, common_1.Controller)('puppeteer'),
    __metadata("design:paramtypes", [puppeteer_service_1.PuppeteerService])
], PuppeteerController);
exports.PuppeteerController = PuppeteerController;
//# sourceMappingURL=puppeteer.controller.js.map