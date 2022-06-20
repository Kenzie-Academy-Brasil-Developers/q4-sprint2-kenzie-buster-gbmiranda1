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
exports.Dvd = void 0;
const typeorm_1 = require("typeorm");
const cart_entity_1 = require("./cart.entity");
const stock_entity_1 = require("./stock.entity");
let Dvd = class Dvd {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Dvd.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Dvd.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Dvd.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => stock_entity_1.Stock, (stock) => stock, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", stock_entity_1.Stock)
], Dvd.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cart_entity_1.Cart, (cart) => cart.dvd),
    __metadata("design:type", Array)
], Dvd.prototype, "cart", void 0);
Dvd = __decorate([
    (0, typeorm_1.Entity)("dvd")
], Dvd);
exports.Dvd = Dvd;
//# sourceMappingURL=dvd.entity.js.map