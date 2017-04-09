/**
 * 設定値保持クラス
 * @export
 * @class Config
 */
export class Config {

  /**
   * 本番環境用APIのURL
   */
  private static readonly PRODUCT_API_ROOT_URL = 'http://localhost:3000/api/v1/';

  /**
   * 開発環境用APIのURL
   */
  private static readonly DEV_API_ROOT_URL = 'http://localhost:3000/api/v1/';

  private static instance: Config;

  private apiRoot: string;

  /**
   * コンストラクタ
   * @param {string} apiRoot 
   */
  private constructor(apiRoot: string) {
    this.apiRoot = apiRoot;
  }

  /**
   * 設定値の初期化を行います。
   * @param {boolean} isProduct
   */
  static initialize(isProduct: boolean) {
    if (isProduct) {
      Config.instance = new Config(Config.PRODUCT_API_ROOT_URL);
    } else {
      Config.instance = new Config(Config.DEV_API_ROOT_URL);
    }
  }

  /**
   * 設定値保持クラスのインスタンスを取得します。
   * @returns {Config} 
   */
  static getInstance(): Config {
    if (!Config.instance) {
      throw new Error('Not initialized!');
    }
    return Config.instance;
  }

  /**
   * APIのURLを取得します。
   * @returns {string} 
   */
  getApiRoot(): string {
    return this.apiRoot;
  }

}
