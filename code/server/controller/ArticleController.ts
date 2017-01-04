'use strict';

import * as Express from 'express';
import { ArticleDao } from '../dao/ArticleDao';

export class ArticleController {

  private articleDao: ArticleDao;

  constructor() {
    this.articleDao = new ArticleDao();
  }

  all(req: Express.Request, res: Express.Response): void {
    this.articleDao.findAllArticles().then((results) => {
        res.send({ data: results });
      })
      .catch((error) => {
        res.status(500).send({ error: error });
      });
  }

  index(req: Express.Request, res: Express.Response): void {
    this.articleDao.findArticles(parseInt(req.query.offset, 10), parseInt(req.query.limit, 10))
      .then((results) => {
        res.send({ data: results });
      })
      .catch((error) => {
        res.status(500).send({ error: error });
      });
  }

  count(req: Express.Request, res: Express.Response): void {
    this.articleDao.findCount()
      .then((results) => {
        res.send({ data: results });
      })
      .catch((error) => {
        res.status(500).send({ error: error });
      });
  }

  create(req: Express.Request, res: Express.Response): void {
    this.articleDao.createArticle(req.body)
      .then((results) => {
        res.send({ data: results });
      })
      .catch((error) => {
        res.status(500).send({ error: error });
      });
  }

  read(req: Express.Request, res: Express.Response): void {
    this.articleDao.findArticleById(parseInt(req.params.id, 10))
      .then((results) => {
        res.send({ data: results });
      })
      .catch((error) => {
        res.status(500).send({ error: error });
      });
  }

  update(req: Express.Request, res: Express.Response): void {
    this.articleDao.updateArticle(parseInt(req.params.id, 10), req.body)
      .then(() => {
        res.send({ message: 'OK' });
      })
      .catch((error) => {
        res.status(500).send({ error: error });
      });
  }

  delete(req: Express.Request, res: Express.Response): void {
    this.articleDao.deleteArticle(parseInt(req.params.id, 10))
      .then(() => {
        res.send({ message: 'OK' });
      })
      .catch((error) => {
        res.status(500).send({ error: error });
      });
  }

}
