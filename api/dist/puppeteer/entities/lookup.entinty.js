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
exports.Lookup = void 0;
const typeorm_1 = require("typeorm");
const pair_entity_1 = require("./pair.entity");
let Lookup = class Lookup {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Lookup.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pair_entity_1.Pair, (pair) => pair.lookup),
    __metadata("design:type", pair_entity_1.Pair)
], Lookup.prototype, "pair", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lookup.prototype, "lang", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", String)
], Lookup.prototype, "createdAt", void 0);
Lookup = __decorate([
    (0, typeorm_1.Entity)('lookup', { schema: 'newsDb' })
], Lookup);
exports.Lookup = Lookup;
//# sourceMappingURL=lookup.entinty.js.map