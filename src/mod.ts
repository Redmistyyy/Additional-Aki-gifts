/* eslint-disable @typescript-eslint/brace-style */
/* eslint-disable @typescript-eslint/no-var-requires */
// Thanks Tron and Spt!
import path                                 from "path";

import { DependencyContainer }              from "tsyringe";
import { IPreSptLoadMod }                   from "@spt/models/external/IPreSptLoadMod";

import { References }                       from "./refs"


class AdditionalSptGifts implements IPreSptLoadMod {
    private mod: string;
    private refs: References = new References();
    private modPath = path.resolve(__dirname.toString()).split(path.sep).join("/")+"/";
    

    constructor() {
        this.mod = "AdditionalSptGifts";
    }

    public preSptLoad(container: DependencyContainer): void {
        

        // load up references of preSptLoad
        this.refs.preSptLoad(container, this.mod);
        
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

module.exports = { mod: new AdditionalSptGifts() }