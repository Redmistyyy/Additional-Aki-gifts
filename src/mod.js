"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/brace-style */
/* eslint-disable @typescript-eslint/no-var-requires */
// Thanks Tron and Aki!
const path_1 = __importDefault(require("path"));
const refs_1 = require("./refs");
class AdditionalAkiGifts {
    mod;
    refs = new refs_1.References();
    modPath = path_1.default.resolve(__dirname.toString()).split(path_1.default.sep).join("/") + "/";
    constructor() {
        this.mod = "AdditionalAkiGifts";
    }
    preAkiLoad(container) {
        // load up references of preAkiLoad
        this.refs.preAkiLoad(container, this.mod);
        const mydb = this.refs.importerUtil.loadRecursive(`${this.modPath}../db/`);
        const gifts = this.refs.giftsConfig.gifts;
        // Add new gifts to aki configs.
        for (const newGiftsLists in mydb.gifts) {
            const newGifts = mydb.gifts[newGiftsLists];
            for (const newGiftsName in newGifts) {
                gifts[newGiftsName] = mydb.gifts[newGiftsLists][newGiftsName];
            }
        }
    }
}
module.exports = { mod: new AdditionalAkiGifts() };
//# sourceMappingURL=mod.js.map