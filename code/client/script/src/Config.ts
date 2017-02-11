export class Config {

  private static readonly PRODUCT_API_ROOT_URL = 'http://localhost:3000/api/v1/';

  private static readonly DEV_API_ROOT_URL = 'http://localhost:3000/api/v1/';

  private static instance: Config;

  private apiRoot: string;

  private constructor(apiRoot: string) {
    this.apiRoot = apiRoot;
  }

  static initialize(isProduct: boolean) {
    if (isProduct) {
      Config.instance = new Config(Config.PRODUCT_API_ROOT_URL);
    } else {
      Config.instance = new Config(Config.DEV_API_ROOT_URL);
    }
  }

  static getInstance(): Config {
    if (!Config.instance) {
      throw new Error('Not initialized!');
    }
    return Config.instance;
  }

  getApiRoot(): string {
    return this.apiRoot;
  }

}
