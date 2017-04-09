import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import * as toastr from 'toastr';
import { AppStore } from '../common/AppStore';
import { ArticleService } from '../services/ArticleService';
import { AppState } from '../models/AppState';
import { RegisteredArticle } from '../models/RegisteredArticle';
import { ArticleAction } from '../actions/ArticleAction';
import { ProcessingModalAction } from '../actions/ProcessingModalAction';

@Component({
  selector: 'article-list',
  providers: [ArticleService],
  templateUrl: './article-list.component.html'
})
export class ArticleListComponent implements OnInit, OnDestroy {

  private htmlElement: HTMLElement;

  articles: RegisteredArticle[];

  isProcessing: boolean;

  constructor(
    private elementRef: ElementRef,
    private articleService: ArticleService,
  ) {
    this.isProcessing = false;
    this.htmlElement = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.onChangeAppState = this.onChangeAppState.bind(this);
    AppStore.getInstance().registerHandler('CHANGE', this.onChangeAppState);
    this.updateArticleList();
  }

  ngOnDestroy(): void {
    AppStore.getInstance().removeHandler('CHANGE', this.onChangeAppState);
  }

  deleteButtonClicked(articleId: number): void {
    ProcessingModalAction.setProcessingFlag(true);
    this.articleService.delete(articleId).subscribe(
      this.onDeleteArticle.bind(this),
      this.onError.bind(this));
  }

  private updateArticleList(): void {
    ProcessingModalAction.setProcessingFlag(true);
    this.articleService
      .findAllArticles()
      .subscribe(
        this.onFindArticles.bind(this),
        this.onError.bind(this));
  }
  
  private onChangeAppState(eventName: string, beforeAppState: AppState, currentAppState: AppState) {
    this.articles = currentAppState.articles;
    this.isProcessing = currentAppState.isProcessing;
  }

  private onFindArticles(registerdArticles: RegisteredArticle[]): void {
    ArticleAction.change(registerdArticles);
    ProcessingModalAction.setProcessingFlag(false);
  }

  private onDeleteArticle(): void {
    toastr.success('削除完了');
    this.updateArticleList();
  }

  private onError(errorMessage: string): void {
    toastr.error(errorMessage);
    ProcessingModalAction.setProcessingFlag(false);
  }

}
