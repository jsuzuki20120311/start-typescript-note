import * as mysql from 'mysql';
import { DbConfigManager } from '../config/DbConfigManager';
import { ArticleDao } from '../dao/ArticleDao';
import { RegisteredArticle } from '../models/RegisteredArticle';

export class ArticleService {

  async getAllArticles(): Promise<RegisteredArticle[]> {
    const connection = mysql.createConnection(DbConfigManager.getConfig());
    connection.connect();
    const articleDao = new ArticleDao(connection);
    try {
      const articles  = await articleDao.findAllArticles();
      return articles;
    } catch(error) {
      throw error;
    } finally {
      connection.destroy();
    }
  }

  async getArticles(offset: number, limit: number): Promise<RegisteredArticle[]> {
    const connection = mysql.createConnection(DbConfigManager.getConfig());
    connection.connect();
    const articleDao = new ArticleDao(connection);
    try {
      const articles = await articleDao.findArticles(offset, limit);
      return articles;
    } catch(error) {
        throw error;
    } finally {
      connection.destroy();
    }
  }



}