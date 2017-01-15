'use strict';

import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { AppState } from '../model/AppState';
import { AppStore } from '../common/AppStore';
import { ArticleService } from "../service/ArticleService";
import { ProcessingModalService } from '../service/ProcessingModalService';
import { Article } from '../model/Article';
import { RegisteredArticle } from "../model/RegisteredArticle";

@Component({
  selector: 'article-editor',
  providers: [ ArticleService, ProcessingModalService ],
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

  constructor(
    private articleService: ArticleService,
    private processingModalService: ProcessingModalService
  ) {
    this.article = {
      title: '',
      body: ''
    };
    this.isProcessing = false;
    this.isCompleted = false;
  }

  ngOnInit(): void {
    this.onChangeAppState = this.onChangeAppState.bind(this);
    AppStore.getInstance().registerHandler('CHANGE', this.onChangeAppState);
  }

  ngOnDestroy(): void {
    AppStore.getInstance().removeHandler('CHANGE', this.onChangeAppState);
  }

  private titleChanged(event: Event): void {
    this.article.title = (event.target as HTMLInputElement).value;
  }

  private bodyChanged(event: Event): void {
    this.article.body = (event.target as HTMLInputElement).value;
  }

  private registerButtonClicked(): void {
    this.processingModalService.setProcessingFlag(true);
    this.articleService.create(this.article);
  }

  private onChangeAppState(eventName: string, beforeAppState: AppState, currentAppState: AppState): void {
    this.isProcessing = currentAppState.isProcessing;
  }

}
