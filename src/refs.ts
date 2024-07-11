/* eslint-disable @typescript-eslint/brace-style */
/* eslint-disable @typescript-eslint/no-var-requires */

import { DependencyContainer }              from "tsyringe";

import { DatabaseServer }                   from "@spt/servers/DatabaseServer";
import { IDatabaseTables }                  from "@spt/models/spt/server/IDatabaseTables";
import { ConfigServer }                     from "@spt/servers/ConfigServer";
import { JsonUtil }                         from "@spt/utils/JsonUtil";
import { ImporterUtil }                     from "@spt/utils/ImporterUtil";
import { PreSptModLoader }                  from "@spt/loaders/PreSptModLoader";
import { IGiftsConfig }                     from "@spt/models/spt/config/IGiftsConfig";
import { ConfigTypes }                      from "@spt/models/enums/ConfigTypes";


export class References 
{
    public modName: string;

    public container: DependencyContainer;
    public preSptModLoader: PreSptModLoader;
    public configServer: ConfigServer;

    public database: DatabaseServer;
    public jsonUtil: JsonUtil;
    public importerUtil: ImporterUtil;
    public tables: IDatabaseTables;
    public giftsConfig: IGiftsConfig;



    public preSptLoad(container: DependencyContainer, mod: string): void
    {
        this.modName = mod;

        this.container = container;
        this.preSptModLoader = container.resolve<PreSptModLoader>("PreSptModLoader");
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
        this.preSptModLoader = container.resolve<PreSptModLoader>("PreSptModLoader");
    }
}