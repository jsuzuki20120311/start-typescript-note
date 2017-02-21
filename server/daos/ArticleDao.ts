import * as mysql from 'mysql';
import { Article } from '../models/Article';
import { RegisteredArticle } from '../models/RegisteredArticle';

/**
 * 記事データ用Daoクラス
 */
export class ArticleDao {

  /**
   * データベースコネクション
   */
  private connection: mysql.IConnection;

  /**
   * コンストラクタ
   * @param {mysql.IConnection} connection データベースコネクション
   */
  constructor(connection: mysql.IConnection) {
    this.connection = connection;
  }

  /**
   * 新しく記事データをDBに作成します。
   * @param {Article} article
   */
  createArticle(article: Article): Promise<any> {
    const query = 'insert into article (title, body, created_at, updated_at) values (?, ?, now(), now())';
    const param = [
      article.title,
      article.body
    ];
    return new Promise<any>((resolve, reject) => {
      this.connection.query(query, param, (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  }

  findAllArticles(): Promise<RegisteredArticle[]> {
    return new Promise<Article[]>((resolve, reject) => {
      const query = ' select' +
        ' id' +
        ' ,title' +
        ' ,body' +
        ' ,DATE_FORMAT(created_at, \'%Y-%m-%d %k:%i:%s\') as createdAt' +
        ' ,DATE_FORMAT(updated_at, \'%Y-%m-%d %k:%i:%s\') as updatedAt' +
        ' from article' +
        ' order by id';
      this.connection.query(query, [], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  }

  findCount(): Promise<{ count: number }> {
    return new Promise<{ count: number }>((resolve, reject) => {
      const query = 'select count(id) as count from article';
      this.connection.query(query, [], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results[0]);
      });
    });
  }

  findArticles(offset: number = 0, limit: number = 0): Promise<RegisteredArticle[]> {
    return new Promise<Article[]>((resolve, reject) => {
      const query = 'select' +
          ' id' +
          ' ,title' +
          ' ,body' +
          ' ,DATE_FORMAT(created_at, \'%Y-%m-%d %k:%i:%s\') as createdAt' +
          ' ,DATE_FORMAT(updated_at, \'%Y-%m-%d %k:%i:%s\') as updatedAt' +
        ' from article' +
        ' order by id' +
        ' limit ?, ?';
      this.connection.query(query, [offset, limit], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  }

  findArticleById(id: number): Promise<RegisteredArticle> {
    return new Promise<Article>((resolve, reject) => {
      const query = 'select ' +
        ' id' +
        ' ,title' +
        ' ,body' +
        ' ,DATE_FORMAT(created_at, \'%Y-%m-%d %k:%i:%s\') as createdAt' +
        ' ,DATE_FORMAT(updated_at, \'%Y-%m-%d %k:%i:%s\') as updatedAt' +
        ' from article' +
        ' where id = ?';
      this.connection.query(query, [id], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  }

  updateArticle(id: number, article: Article): Promise<void> {
    return new Promise<any>((resolve, reject) => {
      const query = 'update article ' +
        'set title = ? ' +
          ', body = ? ' +
          ', updated_at = now() ' +
        'where id = ?';
      const params = [
        article.title,
        article.body,
        id
      ];
      this.connection.query(query, params, (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  }

  deleteArticle(id: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const query = 'DELETE FROM article WHERE ID = ?';
      this.connection.query(query, [id], (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      });
    });
  }

  lock(id: number): Promise<RegisteredArticle> {
    return new Promise<RegisteredArticle>((resolve, reject) => {
      const query = 'select ' +
        ' id ' +
        ' ,title' +
        ' ,body' +
        ' ,DATE_FORMAT(created_at, \'%Y-%m-%d %k:%i:%s\') as createdAt' +
        ' ,DATE_FORMAT(updated_at, \'%Y-%m-%d %k:%i:%s\') as updatedAt' +
        ' from article where id = ? for update';
      this.connection.query(query, [id], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  }

}
