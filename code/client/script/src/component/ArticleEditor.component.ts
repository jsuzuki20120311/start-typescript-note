'use strict';

import * as $ from 'jquery';
import 'bootstrap';
import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { AppState } from "../model/AppState";
import { AppStore } from '../common/AppStore';
import { ArticleService } from "../service/ArticleService";
import { Article } from '../model/Article';
import { RegisteredArticle } from "../model/RegisteredArticle";

@Component({
  selector: 'article-editor',
  providers: [ArticleService],
  template: `
    <div>
      <input type="text" value="{{ article.title }}" (change)="titleChanged($event)" [attr.disabled]="isProcessing ? true : null">
      <input type="text" value="{{ article.body }}" (change)="bodyChanged($event)" [attr.disabled]="isProcessing ? true : null">
      <p class="text-center">
        <button class="btn btn-primary" data-dismiss="modal" (click)="registerButtonClicked()" [attr.disabled]="isProcessing ? true : null">
          登録
        </button>
      </p>
    </div>
  `
})
export class ArticleEditorComponent {

  private article: Article;

  private isProcessing: boolean;

  private isCompleted: boolean;

  constructor(private articleService: ArticleService) {
    this.article = {
      title: '',
      body: ''
    };
  }

  private titleChanged(event: Event): void {
    this.article.title = (event.target as HTMLInputElement).value;
  }

  private bodyChanged(event: Event): void {
    this.article.body = (event.target as HTMLInputElement).value;
  }

  private registerButtonClicked(): void {
    this.articleService.create(this.article);
  }

  private onChangeAppState(eventName: string, beforeAppState: AppState, currentAppState: AppState) {
    this.isProcessing = currentAppState.isProcessing;
  }

}
