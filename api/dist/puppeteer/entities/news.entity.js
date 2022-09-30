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
Object.defineProperty(exports, "__esModule", { value: true });
exports.News = void 0;
const typeorm_1 = require("typeorm");
const lookup_entinty_1 = require("./lookup.entinty");
let News = class News {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], News.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], News.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], News.prototype, "spot", void 0);
__decorate([
    (0, typeorm_1.Column)({ array: true }),
    __metadata("design:type", String)
], News.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], News.prototype, "sumImgURL", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], News.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lookup_entinty_1.Lookup, (lookup) => lookup.news),
    __metadata("design:type", lookup_entinty_1.Lookup)
], News.prototype, "lookup", void 0);
News = __decorate([
    (0, typeorm_1.Entity)('news', { schema: 'newsDb' })
], News);
exports.News = News;
//# sourceMappingURL=news.entity.js.map