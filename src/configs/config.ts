class BaseConfig {
    public readonly basePath: string;
    public readonly bIsDev: boolean = true;
    constructor(isDev: boolean, basePath: string) {
        this.bIsDev = isDev;
        this.basePath = basePath;
    }
}
let config: BaseConfig;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    config = new BaseConfig(true, 'http://localhost:9191/v1');
} else {
    config = new BaseConfig(false, 'http://localhost/v1');
}
export default config;