import * as chokidar from "chokidar";
import * as fsExtra from "fs-extra";

import { AppSettings } from "./models/app.settings";

export class Sync {
    private _settings: AppSettings;

    constructor(settings: AppSettings) {
        this._settings = settings;
    }

    public Mount() {
        this.Copy(this._settings.sourcePath, this._settings.mountPath, () => {
            this.WatchDirectory(this._settings.mountPath);
        });
    }

    private WatchDirectory(path: string) {
        chokidar.watch(path, { ignored: /(^|[\/\\])\../ })
            .on('all', (event, path) => {
                this.Process(event, path);
            });
    }

    private Copy(sourcePath: string, destinationPath: string, cb: any = null) {
        fsExtra.copy(sourcePath, destinationPath).then(() => {
            if (cb != null) {
                cb();
            }
        });
    }

    private Delete(path: string) {
        fsExtra.remove(path);
    }

    private Process(event, path) {
        console.log(event, path);
        let destinationPath = this.GetSourcePath(path);
        console.log(destinationPath);

        switch (event) {
            case "unlinkDir":
            case "unlink":
                this.Delete(destinationPath);
                break;
            default:
                this.Copy(path, destinationPath);
                break;
        }
    }

    private ExtractMountPath(path: string) {
        return path.replace(this._settings.mountPath, '');
    }

    private GetSourcePath(path: string) {
        path = this.ExtractMountPath(path);
        return `${this._settings.sourcePath}\\${path}`;
    }
}