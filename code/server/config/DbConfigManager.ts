'use strict';

import * as fs from 'fs';
import DbConfig from './DbConfig';

export default class DbConfigManager {

  private static dbConfig: DbConfig;

  public static getConfig(): DbConfig {
    if (!DbConfigManager.dbConfig) {
      let data = fs.readFileSync('./json/db_config.json', 'utf-8');
      DbConfigManager.dbConfig = JSON.parse(data);
    }
    return DbConfigManager.dbConfig;
  }

}
