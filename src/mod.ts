/* eslint-disable @typescript-eslint/brace-style */
/* eslint-disable @typescript-eslint/no-var-requires */
// Thanks Tron and Aki!
import path                                 from "path";

import { DependencyContainer }              from "tsyringe";
import { IPreAkiLoadMod }                   from "@spt-aki/models/external/IPreAkiLoadMod";
import { IPostDBLoadMod }                   from "@spt-aki/models/external/IPostDBLoadMod";

import { References }                       from "./refs"


class AdditionalAkiGifts implements IPreAkiLoadMod, IPostDBLoadMod {
    private mod: string;
    private refs: References = new References();
    private modPath = path.resolve(__dirname.toString()).split(path.sep).join("/")+"/";
    

    constructor() {
        this.mod = "AdditionalAkiGifts";
    }

    public preAkiLoad(container: DependencyContainer): void {
        

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

module.exports = { mod: new AdditionalAkiGifts() }