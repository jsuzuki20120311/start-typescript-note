import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import * as Rx from 'rxjs';
import { Config } from '../Config';
import { Article } from "../models/Article";

@Injectable()
export class ArticleService {

  private static readonly API = 'article';

  constructor(private http: Http) {
  }

  findArticles(offset: number, limit: number): Rx.Observable<any> {
    const url = `${Config.getInstance().getApiRoot()}${ArticleService.API}?offset=${offset}&limit=${limit}`;
    return this.http.get(encodeURI(url))
      .map(this.extractData)
      .catch(this.handleError);
  }

  findArticleById(id: number): Rx.Observable<any> {
    const url = `${Config.getInstance().getApiRoot()}${ArticleService.API}/${id}`;
    return this.http.get(encodeURI(url))
      .map(this.extractData)
      .catch(this.handleError);
  }

  findAllArticles(): Rx.Observable<any> {
    const url = `${Config.getInstance().getApiRoot()}${ArticleService.API}/all`;
    return this.http.get(encodeURI(url))
      .map(this.extractData)
      .catch(this.handleError);
  }

  create(article: Article): Rx.Observable<any> {
    const sendData = JSON.stringify(article);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ headers: headers });
    return this.http.put(encodeURI(`${Config.getInstance().getApiRoot()}${ArticleService.API}`), sendData, requestOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  update(id: number, article: Article): Rx.Observable<any> {
    const url = `${Config.getInstance().getApiRoot()}${ArticleService.API}/${id}`;
    const sendData = JSON.stringify(article);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ headers: headers });
    return this.http.post(encodeURI(url), sendData, requestOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  delete(id: number): Rx.Observable<any> {
    const url = `${Config.getInstance().getApiRoot()}${ArticleService.API}/${id}`;
    return this.http.delete(encodeURI(url))
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response): any {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    return res.json().data;
  }

  private handleError (error: any): any {
    const errMsg = error.message || 'Server error';
    return Rx.Observable.throw(errMsg);
  }

}
