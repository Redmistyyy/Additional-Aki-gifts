"use strict";
/* eslint-disable @typescript-eslint/brace-style */
/* eslint-disable @typescript-eslint/no-var-requires */
Object.defineProperty(exports, "__esModule", { value: true });
exports.References = void 0;
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
class References {
    modName;
    container;
    preAkiModLoader;
    configServer;
    database;
    jsonUtil;
    importerUtil;
    tables;
    giftsConfig;
    preAkiLoad(container, mod) {
        this.modName = mod;
        this.container = container;
        this.preAkiModLoader = container.resolve("PreAkiModLoader");
        this.configServer = container.resolve("ConfigServer");
        this.importerUtil = container.resolve("ImporterUtil");
        this.jsonUtil = container.resolve("JsonUtil");
        this.configServer = container.resolve("ConfigServer");
        this.giftsConfig = this.configServer.getConfig(ConfigTypes_1.ConfigTypes.GIFTS);
    }
    postDBLoad(container) {
        this.container = container;
        this.database = container.resolve("DatabaseServer");
        this.tables = container.resolve("DatabaseServer").getTables();
        this.jsonUtil = container.resolve("JsonUtil");
        this.importerUtil = container.resolve("ImporterUtil");
        this.preAkiModLoader = container.resolve("PreAkiModLoader");
    }
}
exports.References = References;
//# sourceMappingURL=refs.js.map