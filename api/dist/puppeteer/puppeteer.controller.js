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
    getNewsByAlias(alias, lang) {
        console.log(alias, lang);
        return this.pptService.getNewsByAlias(alias, lang);
    }
    createNewsByAliasAndLangForCurrencies(alias, lang) {
        return this.pptService.createNewsByAliasAndLang(alias, lang);
    }
    createNewsByAliasAndLangForCrypto() {
        return this.pptService.createNewsForCrypto();
    }
    refreshCurrencies() {
        return this.pptService.refreshCurrenciesNews();
    }
};
__decorate([
    (0, common_1.Get)('/news/:alias'),
    __param(0, (0, common_1.Param)('alias')),
    __param(1, (0, common_1.Query)('lang')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PuppeteerController.prototype, "getNewsByAlias", null);
__decorate([
    (0, common_1.Post)('news/currencies/:alias'),
    __param(0, (0, common_1.Param)('alias')),
    __param(1, (0, common_1.Query)('lang')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PuppeteerController.prototype, "createNewsByAliasAndLangForCurrencies", null);
__decorate([
    (0, common_1.Post)('news/crypto/create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PuppeteerController.prototype, "createNewsByAliasAndLangForCrypto", null);
__decorate([
    (0, common_1.Post)('refresh/news/currencies'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PuppeteerController.prototype, "refreshCurrencies", null);
PuppeteerController = __decorate([
    (0, common_1.Controller)('puppeteer'),
    __metadata("design:paramtypes", [puppeteer_service_1.PuppeteerService])
], PuppeteerController);
exports.PuppeteerController = PuppeteerController;
//# sourceMappingURL=puppeteer.controller.js.map