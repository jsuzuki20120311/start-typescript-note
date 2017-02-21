import * as fs from 'fs';
import { DbConfig } from './DbConfig';

export class DbConfigManager {

  private static dbConfig: DbConfig;

  public static initialize(): void {
    const data = fs.readFileSync('./json/db_config.json', 'utf-8');
    DbConfigManager.dbConfig = JSON.parse(data);
  }

  public static getConfig(): DbConfig {
    if (!DbConfigManager.dbConfig) {
      throw new Error('Did not initialized!');
    }
    return DbConfigManager.dbConfig;
  }

}
