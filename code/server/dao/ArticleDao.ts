'use strict';

import * as mysql from 'mysql';
import { AbstractDao } from './AbstractDao';
import { Article } from '../model/Article';
import { RegisteredArticle } from '../model/RegisteredArticle';

export class ArticleDao extends AbstractDao {

  constructor() {
    super();
  }

  createArticle(article: Article): Promise<any> {
    const query = 'insert into article (title, body, created_at, updated_at) values (?, ?, now(), now())';
    const param = [
      article.title,
      article.body
    ];
    return new Promise<any>((resolve, reject) => {
      const connection = this.createConnection();
      connection.query(query, param, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
        connection.destroy();
      });
    });
  }

  findAllArticles(): Promise<RegisteredArticle[]> {
    return new Promise<Article[]>((resolve, reject) => {
      const connection = this.createConnection();
      const query = ' select' +
        ' id' +
        ' ,title' +
        ' ,body' +
        ' ,DATE_FORMAT(created_at, \'%Y-%m-%d %k:%i:%s\') as createdAt' +
        ' ,DATE_FORMAT(updated_at, \'%Y-%m-%d %k:%i:%s\') as updatedAt' +
        ' from article' +
        ' order by id';
      connection.query(query, [], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
        connection.destroy();
      });
    });
  }

  findCount(): Promise<{ count: number }> {
    return new Promise<{ count: number }>((resolve, reject) => {
      const connection = this.createConnection();
      const query = 'select count(id) as count from article';
      connection.query(query, [], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
        connection.destroy();
      });
    });
  }

  findArticles(offset: number = 0, limit: number = 0): Promise<RegisteredArticle[]> {
    const query = ' select' +
        ' id' +
        ' ,title' +
        ' ,body' +
        ' ,DATE_FORMAT(created_at, \'%Y-%m-%d %k:%i:%s\') as createdAt' +
        ' ,DATE_FORMAT(updated_at, \'%Y-%m-%d %k:%i:%s\') as updatedAt' +
      ' from article' +
      ' order by id' +
      ' limit ?, ?';
    return new Promise<Article[]>((resolve, reject) => {
      const connection = this.createConnection();
      connection.query(query, [offset, limit], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
        connection.destroy();
      });
    });
  }

  findArticleById(id: number): Promise<RegisteredArticle> {
    return new Promise<Article>((resolve, reject) => {
      const query = ' select' +
        ' id' +
        ' ,title' +
        ' ,body' +
        ' ,DATE_FORMAT(created_at, \'%Y-%m-%d %k:%i:%s\') as createdAt' +
        ' ,DATE_FORMAT(updated_at, \'%Y-%m-%d %k:%i:%s\') as updatedAt' +
        ' from article' +
        ' where id = ?';
      const connection = this.createConnection();
      connection.query(query, [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
        connection.destroy();
      });
    });
  }

  updateArticle(id: number, article: Article): Promise<void>{
    const connection = this.createConnection();

    const updatePromise = new Promise<any>((resolve, reject) => {
      const query = 'update article ' +
        'set title = ? ' +
          ', body = ? ' +
          ', updated_at = now() ' +
        'where id = ? ';

      const params = [
        article.title,
        article.body,
        id
      ];

      connection.query(query, params, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    return new Promise<void>((resolve, reject) => {
      this.startTransaction(connection)
      .then(() => {
        return this.lock(id, connection);
      })
      .then(() => {
        return updatePromise;
      })
      .then(() => {
        return this.commit(connection);
      })
      .then(() => {
        connection.destroy();
        resolve();
      })
      .catch((error) => {
        connection.rollback(() => {
          connection.destroy();
        });
        reject(error);
      });
    });
  }

  deleteArticle(id: number): Promise<void> {
    const connection = this.createConnection();

    const deletePromise = new Promise<void>((resolve, reject) => {
      const query = 'DELETE FROM article WHERE ID = ? ';
      connection.query(query, [id], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });

    return new Promise<void>((resolve, reject) => {
      this.startTransaction(connection)
      .then(() => {
        return this.lock(id, connection);
      })
      .then(() => {
        return deletePromise;
      })
      .then(() => {
        return this.commit(connection);
      })
      .then(() => {
        connection.destroy();
        resolve();
      })
      .catch((error) => {
        connection.rollback(() => {
          connection.destroy();
        });
        reject(error);
      });
    });
  }

  private lock(id: number, connection: mysql.IConnection): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const query = 'select * from article where id = ? for update';
      connection.query(query, [id], (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

}
