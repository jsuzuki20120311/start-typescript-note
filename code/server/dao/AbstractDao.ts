import * as mysql from 'mysql';
import DbConfigManager from '../config/DbConfigManager';

export abstract class AbstractDao {

  protected createConnection(): mysql.IConnection {
    let connection = mysql.createConnection(DbConfigManager.getConfig());
    connection.connect((error) => {
      if (error) {
        console.error(error);
      }
    });
    return connection;
  }

  protected startTransaction(connection: mysql.IConnection): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      connection.beginTransaction((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  protected commit(connection: mysql.IConnection): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      connection.commit((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

}
