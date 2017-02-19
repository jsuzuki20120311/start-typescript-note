import * as express from 'express';
import { ArticleDao } from '../dao/ArticleDao';

/**
 * 記事API用コントローラ
 */
export class ArticleController {

  private articleDao: ArticleDao;

  /**
   * コンストラクタ
   */
  constructor() {
    this.articleDao = new ArticleDao();
  }

  all(req: express.Request, res: express.Response, next: express.NextFunction): void {
    this.articleDao.connect()
    .then(() => {
      return this.articleDao.findAllArticles();
    })
    .then((results) => {
      this.articleDao.destroyConnection();
      res.send({ data: results });
    })
    .catch(() => {
      this.articleDao.destroyConnection();
      next({ status: 500 });
    });
  }

  index(req: express.Request, res: express.Response, next: express.NextFunction): void {
    this.articleDao.connect()
    .then(() => {
      const offset = parseInt(req.query.offset, 10);
      const limit = parseInt(req.query.limit, 10);
      return this.articleDao.findArticles(offset, limit);
    })
    .then((results) => {
      this.articleDao.destroyConnection();
      res.send({ data: results });
    })
    .catch(() => {
      this.articleDao.destroyConnection();
      next({ status: 500 });
    });
  }

  count(req: express.Request, res: express.Response, next: express.NextFunction): void {
    this.articleDao.connect()
    .then(() => {
      return this.articleDao.findCount();
    })
    .then((count) => {
      this.articleDao.destroyConnection();
      res.send({ data: count });
    })
    .catch(() => {
      this.articleDao.destroyConnection();
      next({ status: 500 });
    });
  }

  create(req: express.Request, res: express.Response, next: express.NextFunction): void {
    this.articleDao.connect()
    .then(() => {
      this.articleDao.createArticle(req.body);
    })
    .then((results) => {
      this.articleDao.destroyConnection();
      res.send({ data: results });
    })
    .catch(() => {
      this.articleDao.destroyConnection();
      next({ status: 500 });
    });
  }

  read(req: express.Request, res: express.Response, next: express.NextFunction): void {
    this.articleDao.connect()
    .then(() => {
      return this.articleDao.findArticleById(parseInt(req.params.id, 10));
    })
    .then((results) => {
      this.articleDao.destroyConnection();
      res.send({ data: results });
    })
    .catch(() => {
      this.articleDao.destroyConnection();
      next({ status: 500 });
    });
  }

  update(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const articleId = parseInt(req.params.id, 10);
    this.articleDao.connect()
    .then(() => {
      return this.articleDao.lock(articleId);
    })
    .then((results) => {
      if (!Array.isArray(results) || results.length === 0) {
        return Promise.reject({status: 404}); 
      }
      if (results[0].updatedAt !== req.body.updatedAt) {
        return Promise.reject({status: 409});
      }
      return this.articleDao.updateArticle(articleId, req.body);
    })
    .then((results) => {
      this.articleDao.destroyConnection();
      res.send({ data: results });
    })
    .catch((error) => {
      this.articleDao.destroyConnection();
      error.status = error.status || 500;
      next(error);
    });
  }

  delete(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const articleId = parseInt(req.params.id, 10);
    this.articleDao.connect()
    .then(() => {
      return this.articleDao.lock(articleId);
    })
    .then((results) => {
      if (!Array.isArray(results) || results.length === 0) {
        return Promise.reject({status: 404});
      }
      return this.articleDao.deleteArticle(articleId);
    })
    .then((results) => {
      this.articleDao.destroyConnection();
      res.send({ data: results });
    })
    .catch((error) => {
      this.articleDao.destroyConnection();
      error.status = error.status || 500;
      next({ status: 500 });
    });
  }

}
