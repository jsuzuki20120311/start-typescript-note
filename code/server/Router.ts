'use strict';

import * as bodyParser from'body-parser';
import * as express from 'express';
import { ArticleController } from "./controller/ArticleController";

export class Router {

  private articleController: ArticleController;

  constructor() {
    this.articleController = new ArticleController();
  }

  routing(app: express.Express): express.Express {

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.put('/sample-crud-app/api/v1/article/', (req, res) => {
      this.articleController.create(req, res);
    });

    app.get('/sample-crud-app/api/v1/article/', (req, res) => {
      this.articleController.index(req, res);
    });

    app.get('/sample-crud-app/api/v1/article/all', (req, res) => {
      this.articleController.all(req, res);
    });

    app.get('/sample-crud-app/api/v1/article/count', (req, res) => {
      this.articleController.count(req, res);
    });

    app.get('/sample-crud-app/api/v1/article/:id', (req, res) => {
      this.articleController.read(req, res);
    });

    app.post('/sample-crud-app/api/v1/article/:id', (req, res) => {
      this.articleController.update(req, res);
    });

    app.delete('/sample-crud-app/api/v1/article/:id', (req, res) => {
      this.articleController.delete(req, res);
    });

    app.use('/sample-crud-app', express.static(__dirname + '/public/'));

    app.use('/sample-crud-app/:param', express.static('./public/'));

    app.use((req, res) => {
      res.status(404).sendFile(__dirname + "/public/404.html");
    });

    return app;
  }

}
