import * as fs from 'fs';
import { DbConfig } from './DbConfig';

export class DbConfigManager {

  private static dbConfig: DbConfig;

  public static getConfig(): DbConfig {
    if (!DbConfigManager.dbConfig) {
      const data = fs.readFileSync('./json/db_config.json', 'utf-8');
      DbConfigManager.dbConfig = JSON.parse(data);
    }
    return DbConfigManager.dbConfig;
  }

}