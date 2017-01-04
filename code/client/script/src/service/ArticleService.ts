'use strict';

import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { AppStore } from '../common/AppStore';
import {Article} from "../model/Article";
import {RegisteredArticle} from "../model/RegisteredArticle";

@Injectable()
export class ArticleService {

  private static readonly API_URL = 'http://localhost:3000/sample-crud-app/api/v1/article';

  constructor(private http: Http) {

  }

  findArticles(offset: number, limit: number): void {
    const url = `${ArticleService.API_URL}?offset=${offset}&limit=${limit}`;
    this.http.get(encodeURI(url))
      .map(this.extractData)
      .catch(this.handleError)
      .subscribe((result) => {
        AppStore.getInstance().applyAppState('CHANGE', {
          articles: (<RegisteredArticle[]> result),
          isProcessing: false
        });
      });
  }

  findAllArticles(): void {
    const url = `${ArticleService.API_URL}/all`;
    this.http.get(encodeURI(url))
      .map(this.extractData)
      .catch(this.handleError)
      .subscribe((result) => {
        AppStore.getInstance().applyAppState('CHANGE', {
          articles: (<RegisteredArticle[]> result),
          isProcessing: false
        });
      });
  }

  create(article: Article): void {
    const sendData = JSON.stringify(article);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ headers: headers });
    this.http.put(encodeURI(ArticleService.API_URL), sendData, requestOptions)
      .map(this.extractData)
      .catch(this.handleError)
      .subscribe(() => {
        this.findAllArticles();
      });
  }

  update(id: number, article: Article): void {
    const url = `${ArticleService.API_URL}/${id}`;
    const sendData = JSON.stringify(article);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ headers: headers });
    this.http.post(encodeURI(url), sendData, requestOptions)
      .map(this.extractData)
      .catch(this.handleError)
      .subscribe(() => {
        this.findAllArticles();
      });
  }

  delete(id: number): void {
    const url = `${ArticleService.API_URL}/${id}`;
    this.http.delete(encodeURI(url))
      .map(this.extractData)
      .catch(this.handleError)
      .subscribe(() => {
        this.findAllArticles();
      });
  }

  private extractData(res: Response): any {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    return res.json().data;
  }

  private handleError (error: any): any {
    const errMsg = error.message || 'Server error';
    return Observable.throw(errMsg);
  }

}
