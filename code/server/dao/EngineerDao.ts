// 'use strict';
//
// import * as mysql from 'mysql';
// import { Promise } from 'es6-promise';
// import { AbstractDao } from './AbstractDao';
// import { Engineer } from '../model/Engineer';
//
// /**
//  * エンジニアDaoクラス
//  */
// export default class EngineerDao extends AbstractDao {
//
//   /**
//    * 新規エンジニアデータを作成します。
//    * @param engineer {Engineer}
//    * @return {Promise<any>}
//    */
//   createEngineer(engineer: Engineer): Promise<any> {
//     const QUERY = 'INSERT INTO ENGINEERS SET ? ';
//     const PARAM = {
//       name: engineer.name,
//       power: engineer.power,
//       text: engineer.text
//     };
//     let connection = AbstractDao.createConnection();
//     return new Promise<any>((resolve, reject) => {
//       connection.query(QUERY, PARAM, (error, results) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(results);
//         }
//         connection.destroy();
//       });
//     });
//   }
//
//   findEngineerList(offset: number, limit: number): Promise<Engineer[]> {
//     const QUERY = 'SELECT id, name, power, text FROM ENGINEERS ORDER BY ID LIMIT ?, ? ';
//     let connection = AbstractDao.createConnection();
//     return new Promise((resolve, reject) => {
//       connection.query(QUERY, [offset, limit], (error, results) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(results);
//         }
//         connection.destroy();
//       });
//     });
//   }
//
//   /**
//    * IDからエンジニアの情報を取得します。
//    * @param id {number}
//    * @return {Promise<Engineer>}
//    */
//   findEngineerById(id : number): Promise<Engineer> {
//     const QUERY = 'SELECT id, name, power, text FROM ENGINEERS WHERE ID = ? ';
//     let connection = AbstractDao.createConnection();
//     return new Promise((resolve, reject) => {
//       connection.query(QUERY, [id], (error, results) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(results[0]);
//         }
//         connection.destroy();
//       });
//     });
//   }
//
//   getRandom(): Promise<Engineer> {
//     const QUERY = 'SELECT id, name, power, text FROM ENGINEERS ORDER BY RAND() LIMIT 1';
//     let connection = AbstractDao.createConnection();
//     return new Promise((resolve, reject) => {
//       connection.query(QUERY, [], (error, results) => {
//         if (error) {
//           reject(error);
//         } else if (!Array.isArray(results) || results.length === 0) {
//           reject({message: 'Not found.'});
//         } else {
//           resolve(results[0]);
//         }
//         connection.destroy();
//       });
//     });
//   }
//
//   deleteEngineerById(id: number): Promise<any> {
//     const DELETE_QUERY = 'DELETE FROM ENGINEERS WHERE ID = ? ';
//     let connection = AbstractDao.createConnection();
//
//     let deleteProcess = new Promise<void>((resolve, reject) => {
//       connection.query(DELETE_QUERY, [id], (error, result) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(result);
//         }
//       });
//     });
//
//     return this.createLockPromise(connection, id, deleteProcess);
//   }
//
//   updateEngineer(id: number, engineer: Engineer): Promise<any> {
//     const QUERY =
//       'UPDATE ENGINEERS ' +
//         'SET NAME = ? ' +
//           ', POWER = ? ' +
//           ', TEXT = ? ' +
//       'WHERE ID = ? ';
//
//     const PARAM = [
//       engineer.name,
//       engineer.power,
//       engineer.text,
//       id
//     ];
//
//     let connection = AbstractDao.createConnection();
//
//     let updateProcess = new Promise<any>((resolve, reject) => {
//       connection.query(QUERY, PARAM, (error, results) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(results);
//         }
//       });
//     });
//
//     return this.createLockPromise(connection, engineer.id, updateProcess);
//   }
//
//   private lockEngineer(connection : mysql.IConnection, id: number): Promise<void> {
//
//     const LOCK_QUERY = 'SELECT id, name, power, text FROM ENGINEERS WHERE ID = ? FOR UPDATE';
//
//     return new Promise<void>((resolve, reject) => {
//       connection.query(LOCK_QUERY, [id], (error) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve();
//         }
//       });
//     });
//   }
//
//   private createLockPromise(connection: mysql.IConnection, id: number, process: Promise<any>): Promise<void> {
//
//     return new Promise<void>((resolve, reject) => {
//       AbstractDao.startTransaction(connection)
//         .then(() => {
//           return this.lockEngineer(connection, id);
//         })
//         .then(() => {
//           return process;
//         })
//         .then(() => {
//           return AbstractDao.commit(connection);
//         })
//         .then(() => {
//           connection.destroy();
//           resolve();
//         })
//         .catch((error) => {
//           connection.rollback(() => {
//             connection.destroy();
//           });
//           reject(error);
//         });
//     });
//   };
//
// }
//
