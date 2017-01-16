'use strict';

import * as $ from 'jquery';
import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { AppState } from "../model/AppState";
import { AppStore } from '../common/AppStore';
import { ArticleService } from "../service/ArticleService";
import { RegisteredArticle } from "../model/RegisteredArticle";
import { ProcessingModalService } from "../service/ProcessingModalService";
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessingModalAction } from '../action/ProcessingModalAction';

@Component({
  selector: 'update-article-page',
  providers: [ ArticleService ],
  template: `
    <h2>記事更新</h2>
    <div *ngIf="article">
      <input type="text" value="{{ article.title }}" (change)="titleChanged($event)" [attr.disabled]="isProcessing ? true : null">
      <input type="text" value="{{ article.body }}" (change)="bodyChanged($event)" [attr.disabled]="isProcessing ? true : null">
      <button (click)="updateButtonClicked()">更新</button>
      <button (click)="deleteButtonClicked()">削除</button>
   </div>
  `
})
export class UpdateArticlePageComponent implements OnInit {

  private isProcessing: boolean;

  private article: RegisteredArticle;

  constructor(
    private activeRoute: ActivatedRoute,
    private articleService: ArticleService
  ) {
  }

  ngOnInit(): void {
    this.isProcessing = false;
    ProcessingModalAction.setProcessingFlag(true);
    this.activeRoute.params.subscribe((params) => {
      this.articleService.findArticleById(parseInt(params['id'], 10)).subscribe((articles) => {
         this.article = articles[0];
         ProcessingModalAction.setProcessingFlag(false);
      });
    });
  }

  private titleChanged(event: Event): void {
    this.article.title = (event.target as HTMLInputElement).value;
  }

  private bodyChanged(event: Event): void {
    this.article.body = (event.target as HTMLInputElement).value;
  }

  private updateButtonClicked(): void {
    ProcessingModalAction.setProcessingFlag(true);
    this.articleService.update(this.article.id, this.article).subscribe(() => {
      ProcessingModalAction.setProcessingFlag(false);
    });
  }

  private deleteButtonClicked(): void {
    ProcessingModalAction.setProcessingFlag(true);
    this.articleService.delete(this.article.id).subscribe(() => {
      ProcessingModalAction.setProcessingFlag(false);
    });
  }

}
