class BaseConfig {
    public readonly host: string;
    public readonly basePath: string;
    public readonly bIsDev: boolean = true;
    constructor(isDev: boolean, host: string, basePath: string) {
        this.bIsDev = isDev;
        this.host = basePath;
        this.basePath = basePath
    }
}
let config: BaseConfig;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    config = new BaseConfig(true, 'http://localhost:3000', '/sample-redux-sagas-client');
} else {
    config = new BaseConfig(false, 'https://weishi258.github.io', '/sample-redux-sagas-client');
}
export default config;
