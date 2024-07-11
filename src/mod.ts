/* eslint-disable @typescript-eslint/brace-style */
/* eslint-disable @typescript-eslint/no-var-requires */
// Thanks Tron and Spt!
import path                                 from "path";

import { DependencyContainer }              from "tsyringe";
import { IPreSptLoadMod }                   from "@spt/models/external/IPreSptLoadMod";
import { IPostDBLoadMod }                   from "@spt/models/external/IPostDBLoadMod";

import { References }                       from "./refs"


class AdditionalSptGifts implements IPreSptLoadMod, IPostDBLoadMod {
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

        // Call external localization server
        /*for (const giftsName in gifts) {
            gifts[giftsName]['localeTextId'] = giftsName + " Message";
        }*/
    }

    /*public postDBLoad(container: DependencyContainer): void {
        
        this.refs.postDBLoad(container);

        const locales = this.refs.tables.locales.global;
        const mydb = this.refs.importerUtil.loadRecursive(`${this.modPath}../db/`);
        
        for (const localeID in mydb.locales)
            {
                for (const id in mydb.locales[localeID].templates) {
                    const item = mydb.locales[localeID].templates[id];
                    //logger.info(item);
                    for(const locale in item) {
                        locales[localeID][`${id} ${locale}`] = item[locale];
                    }
                }
            }
    }*/
}

module.exports = { mod: new AdditionalSptGifts() }