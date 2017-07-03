import { Sync } from "./sync";
import { AppSettings } from "./models/app.settings";
import * as fs from "fs";

export class App {
    private _configFileName: string = process.cwd() + "/code-sync.json";
    private _settings: AppSettings;
    private _sync: Sync;

    constructor() {
        this._settings = new AppSettings();
    }

    public Start() {
        this.GetAppSetings();
        this._sync = new Sync(this._settings);
        this._sync.Mount();
    }

    private GetAppSetings() {
        if (fs.existsSync(this._configFileName)) {
            this._settings = JSON.parse(fs.readFileSync(this._configFileName, "UTF-8"));
            this._settings.mountPath = process.cwd();
        } else {
            throw new Error("Config file is missing");
        }
    }
}