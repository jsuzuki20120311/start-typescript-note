import * as express from 'express';
import { ArticleController } from '../../../controllers/ArticleController';

const article = express.Router();

article.get('/', (req, res, next) => {
  const articleController = new ArticleController();
  articleController.index(req, res, next);
});

article.put('/', (req, res, next) => {
  const articleController = new ArticleController();
  articleController.create(req, res, next);
});

article.get('/all', (req, res, next) => {
  const articleController = new ArticleController();
  articleController.all(req, res, next);
});

article.get('/count', (req, res, next) => {
  const articleController = new ArticleController();
  articleController.count(req, res, next);
});

article.get('/:id', (req, res, next) => {
  const articleController = new ArticleController();
  articleController.read(req, res, next);
});

article.post('/:id', (req, res, next) => {
  const articleController = new ArticleController();
  articleController.update(req, res, next);
});

article.delete('/:id', (req, res, next) => {
  const articleController = new ArticleController();
  articleController.delete(req, res, next);
});

export default article;
