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
exports.Summary = void 0;
const typeorm_1 = require("typeorm");
const content_entity_1 = require("./content.entity");
const lookup_entinty_1 = require("./lookup.entinty");
let Summary = class Summary {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Summary.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Summary.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Summary.prototype, "spot", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lookup_entinty_1.Lookup, (lookup) => lookup.summary),
    __metadata("design:type", lookup_entinty_1.Lookup)
], Summary.prototype, "lookup", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => content_entity_1.Content, (content) => content.summary),
    __metadata("design:type", Array)
], Summary.prototype, "content", void 0);
Summary = __decorate([
    (0, typeorm_1.Entity)('summary', { schema: 'newsDb' })
], Summary);
exports.Summary = Summary;
//# sourceMappingURL=summary.entity.js.map