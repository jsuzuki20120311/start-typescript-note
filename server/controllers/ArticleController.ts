import * as express from 'express';
import * as mysql from 'mysql';
import { DbConfigManager } from '../config/DbConfigManager';
import { ArticleDao } from '../daos/ArticleDao';

/**
 * 記事API用コントローラ
 */
export class ArticleController {

  all(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const connection = mysql.createConnection(DbConfigManager.getConfig());
    connection.connect();
    const articleDao = new ArticleDao(connection);
    articleDao.findAllArticles()
    .then(() => {
      return articleDao.findAllArticles();
    })
    .then((results) => {
      connection.destroy();;
      res.send({ data: results });
    })
    .catch(() => {
      connection.destroy();;
      next({ status: 500 });
    });
  }

  index(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const connection = mysql.createConnection(DbConfigManager.getConfig());
    connection.connect();
    const articleDao = new ArticleDao(connection);
    const offset = parseInt(req.query.offset, 10);
    const limit = parseInt(req.query.limit, 10);
    articleDao.findArticles(offset, limit)
    .then((results) => {
      connection.destroy();;
      res.send({ data: results });
    })
    .catch(() => {
      connection.destroy();;
      next({ status: 500 });
    });
  }

  count(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const connection = mysql.createConnection(DbConfigManager.getConfig());
    connection.connect();
    const articleDao = new ArticleDao(connection);
    articleDao.findCount()
    .then((count) => {
      connection.destroy();;
      res.send({ data: count });
    })
    .catch(() => {
      connection.destroy();;
      next({ status: 500 });
    });
  }

  create(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const connection = mysql.createConnection(DbConfigManager.getConfig());
    const articleDao = new ArticleDao(connection);
    connection.connect();
    articleDao.createArticle(req.body)
    .then((results) => {
      connection.destroy();;
      res.send({ data: results });
    })
    .catch(() => {
      connection.destroy();;
      next({ status: 500 });
    });
  }

  read(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const connection = mysql.createConnection(DbConfigManager.getConfig());
    connection.connect();
    const articleDao = new ArticleDao(connection);
    articleDao.findArticleById(parseInt(req.params.id, 10))
    .then((results) => {
      connection.destroy();;
      res.send({ data: results });
    })
    .catch(() => {
      connection.destroy();;
      next({ status: 500 });
    });
  }

  update(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const connection = mysql.createConnection(DbConfigManager.getConfig());
    connection.connect();
    const articleId = parseInt(req.params.id, 10);
    const articleDao = new ArticleDao(connection);
    articleDao.lock(articleId)
    .then((results) => {
      if (!Array.isArray(results) || results.length === 0) {
        return Promise.reject({status: 404}); 
      }
      if (results[0].updatedAt !== req.body.updatedAt) {
        return Promise.reject({status: 409});
      }
      return articleDao.updateArticle(articleId, req.body);
    })
    .then((results) => {
      connection.destroy();;
      res.send({ data: results });
    })
    .catch((error) => {
      connection.destroy();;
      error.status = error.status || 500;
      next(error);
    });
  }

  delete(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const connection = mysql.createConnection(DbConfigManager.getConfig());
    connection.connect();
    const articleDao = new ArticleDao(connection);
    const articleId = parseInt(req.params.id, 10);
    articleDao.lock(articleId)
    .then((results) => {
      if (!Array.isArray(results) || results.length === 0) {
        return Promise.reject({status: 404});
      }
      return articleDao.deleteArticle(articleId);
    })
    .then((results) => {
      connection.destroy();
      res.send({ data: results });
    })
    .catch((error) => {
      connection.destroy();;
      error.status = error.status || 500;
      next({ status: 500 });
    });
  }

}
