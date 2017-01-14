'use strict';

import * as $ from 'jquery';
import 'bootstrap';
import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { AppState } from "../model/AppState";
import { AppStore } from '../common/AppStore';
import { ArticleService } from "../service/ArticleService";
import { RegisteredArticle } from "../model/RegisteredArticle";
import { ProcessingModalService } from "../service/ProcessingModalService";

@Component({
  selector: 'article-list',
  providers: [ArticleService, ProcessingModalService],
  template: `
    <h2>記事</h2>
    <table class="table" *ngIf="articles">
      <tr>
        <th>id</th>
        <th>タイトル</th>
        <th>本文</th>
        <th>作成日時</th>
        <th>更新日時</th>
        <th>操作</th>
      </tr>
      <tr *ngFor="let article of articles">
        <td>{{ article.id }}</td>
        <td>{{ article.title }}</td>
        <td>{{ article.body }}</td>
        <td>{{ article.createdAt }}</td>
        <td>{{ article.updatedAt }}</td>
        <td>
          <button class="btn btn-primary" (click)="viewDetailButtonClicked(article)" [attr.disabled]="isProcessing ? true : null">編集</button>
          <button class="btn btn-primary" (click)="deleteButtonClicked(article.id)" [attr.disabled]="isProcessing ? true : null">削除</button>
        </td>
      </tr>
    </table>

    <div class="script-article-edit-modal modal fade">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div *ngIf="selectedArticle" class="box_inner">
            <p>id: {{ selectedArticle.id }}</p>
            <p>{{ selectedArticle.createdAt }}</p>
            <p>{{ selectedArticle.updatedAt }}</p>
            <input type="text" class="script-article-edit-modal__title" value="{{ selectedArticle.title }}" (change)="titleChanged($event)" [attr.disabled]="isProcessing ? true : null">
            <input type="text" class="script-article-edit-modal__title" value="{{ selectedArticle.body }}" (change)="bodyChanged($event)" [attr.disabled]="isProcessing ? true : null">
            <p class="text-center">
              <button class="btn btn-primary" data-dismiss="modal" (click)="updateButtonClicked(selectedArticle)" [attr.disabled]="isProcessing ? true : null">更新</button>
              <button class="btn btn-primary" data-dismiss="modal">閉じる</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ArticleListComponent implements OnInit, OnDestroy {

  private htmlElement: HTMLElement;

  private articles: RegisteredArticle[];

  private isProcessing: boolean;

  private selectedArticle: RegisteredArticle;

  constructor(
    private elementRef: ElementRef,
    private articleService: ArticleService,
    private processingModalService: ProcessingModalService
  ) {
    this.isProcessing = false;
    this.htmlElement = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.onChangeAppState = this.onChangeAppState.bind(this);
    AppStore.getInstance().registerHandler('CHANGE', this.onChangeAppState);
    this.processingModalService.setProcessingFlag(true);
    this.articleService.findAllArticles();
  }

  ngOnDestroy(): void {
    AppStore.getInstance().removeHandler('CHANGE', this.onChangeAppState);
  }

  private onChangeAppState(eventName: string, beforeAppState: AppState, currentAppState: AppState) {
    this.articles = currentAppState.articles;
    this.isProcessing = currentAppState.isProcessing;
  }

  private titleChanged(event: Event): void {
    this.selectedArticle.title = (event.target as HTMLInputElement).value;
  }

  private bodyChanged(event: Event): void {
    this.selectedArticle.body = (event.target as HTMLInputElement).value;
  }

  private viewDetailButtonClicked(article: RegisteredArticle): void {
    this.selectedArticle = Object.assign({}, article);
    ($(this.htmlElement.querySelector('.script-article-edit-modal')) as any).modal('show');
  }

  private updateButtonClicked(article: RegisteredArticle): void {
    this.processingModalService.setProcessingFlag(true);
    this.articleService.update(article.id, article);
  }

  private deleteButtonClicked(id: number): void {
    this.processingModalService.setProcessingFlag(true);
    this.articleService.delete(id);
  }

}
