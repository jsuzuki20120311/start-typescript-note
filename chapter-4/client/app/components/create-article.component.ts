import { Component, OnInit, OnDestroy } from '@angular/core';
import * as toastr from 'toastr';
import { ProcessingModalAction } from '../actions/ProcessingModalAction';
import { AppState } from '../models/AppState';
import { Article } from '../models/Article';
import { AppStore } from '../common/AppStore';
import { ArticleService } from '../services/ArticleService';

@Component({
  selector: 'article-editor',
  providers: [ArticleService],
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit, OnDestroy {

  article: Article;

  isProcessing: boolean;

  isCompleted: boolean;

  constructor(
    private articleService: ArticleService
  ) {
  }

  ngOnInit(): void {
    this.article = {
      title: '',
      body: ''
    };
    this.isProcessing = false;
    this.isCompleted = false;
    this.onChangeAppState = this.onChangeAppState.bind(this);
    AppStore.getInstance().registerHandler('CHANGE', this.onChangeAppState);
  }

  ngOnDestroy(): void {
    AppStore.getInstance().removeHandler('CHANGE', this.onChangeAppState);
  }

  titleChanged(event: Event): void {
    this.article.title = (event.target as HTMLInputElement).value;
  }

  bodyChanged(event: Event): void {
    this.article.body = (event.target as HTMLInputElement).value;
  }

  registerButtonClicked(): void {
    ProcessingModalAction.setProcessingFlag(true);
    this.articleService.create(this.article).subscribe(
      this.onCreateArticle.bind(this),
      this.onCreatedArticleError.bind(this));
  }

  private onCreateArticle(): void {
    toastr.success('登録完了');
    this.isCompleted = true;
    ProcessingModalAction.setProcessingFlag(false);
  }

  private onCreatedArticleError(errorMessage: string): void {
    toastr.error(errorMessage);
    ProcessingModalAction.setProcessingFlag(false);
  }
  
  private onChangeAppState(eventName: string, beforeAppState: AppState, currentAppState: AppState): void {
    this.isProcessing = currentAppState.isProcessing;
  }

}
