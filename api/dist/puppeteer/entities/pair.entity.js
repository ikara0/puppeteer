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
exports.Pair = void 0;
const typeorm_1 = require("typeorm");
const lookup_entinty_1 = require("./lookup.entinty");
let Pair = class Pair {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Pair.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pair.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => lookup_entinty_1.Lookup, (lookup) => lookup.pair),
    __metadata("design:type", Array)
], Pair.prototype, "lookup", void 0);
Pair = __decorate([
    (0, typeorm_1.Entity)('pair', { schema: 'newsDb' })
], Pair);
exports.Pair = Pair;
//# sourceMappingURL=pair.entity.js.map