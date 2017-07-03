export class AppSettings {
    public sourcePath: string;
    public mountPath: string;
    public ignored: Array<any>;

    constructor() {
        this.ignored = new Array<any>();
    }
}