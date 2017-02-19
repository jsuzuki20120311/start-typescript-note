import * as mysql from 'mysql';
import { DbConfigManager } from '../config/DbConfigManager';


/**
 * Daoの基底クラス
 */
export abstract class AbstractDao {

  protected connection: mysql.IConnection;

  constructor() {
    this.connection = mysql.createConnection(DbConfigManager.getConfig());
  }

  connect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.connection.connect((error) => {
        if (error) {
          reject(error);
          return
        }
        resolve();
      });    
    });
  }

  beginTransaction(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.connection.beginTransaction((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }

  commit(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.connection.commit((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }

  rollback(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.connection.rollback(() => {
        resolve();
      });
    });
  }

  destroyConnection(): void {
    this.connection.destroy();
  }

}
