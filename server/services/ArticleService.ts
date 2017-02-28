import * as mysql from 'mysql';
import { DbConfigManager } from '../config/DbConfigManager';
import { ArticleDao } from '../dao/ArticleDao';
import { RegisteredArticle } from '../models/RegisteredArticle';

/**
 * 記事データに関するロジック
 * @export
 * @class ArticleService
 */
export class ArticleService {

  /**
   * 登録済みの全ての記事データを取得します。
   * @returns {Promise<RegisteredArticle[]>}
   */
  async getAllArticles(): Promise<RegisteredArticle[]> {
    const connection = mysql.createConnection(DbConfigManager.getConfig());
    connection.connect();
    const articleDao = new ArticleDao(connection);
    try {
      return await articleDao.findAllArticles();
    } catch(error) {
      throw error;
    } finally {
      connection.destroy();
    }
  }

  /**
   * 
   * @param {number} offset 
   * @param {number} limit 
   * @returns {Promise<RegisteredArticle[]>} 
   */
  async getArticles(offset: number, limit: number): Promise<RegisteredArticle[]> {
    const connection = mysql.createConnection(DbConfigManager.getConfig());
    connection.connect();
    const articleDao = new ArticleDao(connection);
    try {
      return await articleDao.findArticles(offset, limit);
    } catch(error) {
      throw error;
    } finally {
      connection.destroy();
    }
  }

}