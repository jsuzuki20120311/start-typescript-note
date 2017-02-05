import * as express from 'express';
import { ArticleController } from '../../../controller/ArticleController';

const article = express.Router();

article.get('/sample-crud-article/api/v1/article/', (req, res) => {
    const articleController = new ArticleController();
    articleController.index(req, res);
});

article.put('/', (req, res) => {
  const articleController = new ArticleController();
  articleController.create(req, res);
});

article.get('/all', (req, res) => {
  const articleController = new ArticleController();
  articleController.all(req, res);
});

article.get('/count', (req, res) => {
  const articleController = new ArticleController();
  articleController.count(req, res);
});

article.get('/:id', (req, res) => {
  const articleController = new ArticleController();
  articleController.read(req, res);
});

article.post('/:id', (req, res) => {
  const articleController = new ArticleController();
  articleController.update(req, res);
});

article.delete('/:id', (req, res) => {
  const articleController = new ArticleController();
  articleController.delete(req, res);
});

export default article;
