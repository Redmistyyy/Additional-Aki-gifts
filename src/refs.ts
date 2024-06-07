/* eslint-disable @typescript-eslint/brace-style */
/* eslint-disable @typescript-eslint/no-var-requires */

import { DependencyContainer }              from "tsyringe";

import { DatabaseServer }                   from "@spt-aki/servers/DatabaseServer";
import { IDatabaseTables }                  from "@spt-aki/models/spt/server/IDatabaseTables";
import { ConfigServer }                     from "@spt-aki/servers/ConfigServer";
import { JsonUtil }                         from "@spt-aki/utils/JsonUtil";
import { ImporterUtil }                     from "@spt-aki/utils/ImporterUtil";
import { PreAkiModLoader }                  from "@spt-aki/loaders/PreAkiModLoader";
import { IGiftsConfig }                     from "@spt-aki/models/spt/config/IGiftsConfig";
import { ConfigTypes }                      from "@spt-aki/models/enums/ConfigTypes";


export class References 
{
    public modName: string;

    public container: DependencyContainer;
    public preAkiModLoader: PreAkiModLoader;
    public configServer: ConfigServer;

    public database: DatabaseServer;
    public jsonUtil: JsonUtil;
    public importerUtil: ImporterUtil;
    public tables: IDatabaseTables;
    public giftsConfig: IGiftsConfig;



    public preAkiLoad(container: DependencyContainer, mod: string): void
    {
        this.modName = mod;

        this.container = container;
        this.preAkiModLoader = container.resolve<PreAkiModLoader>("PreAkiModLoader");
        this.configServer = container.resolve<ConfigServer>("ConfigServer");
        this.importerUtil = container.resolve<ImporterUtil>("ImporterUtil");
        this.jsonUtil = container.resolve<JsonUtil>("JsonUtil");
        this.configServer = container.resolve("ConfigServer");
        this.giftsConfig = this.configServer.getConfig<IGiftsConfig>(ConfigTypes.GIFTS)
    
    }

    public postDBLoad(container: DependencyContainer): void
    {
        this.container = container;
        this.database = container.resolve<DatabaseServer>("DatabaseServer");
        this.tables = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        this.jsonUtil = container.resolve<JsonUtil>("JsonUtil");
        this.importerUtil = container.resolve<ImporterUtil>("ImporterUtil");
        this.preAkiModLoader = container.resolve<PreAkiModLoader>("PreAkiModLoader");
    }
}