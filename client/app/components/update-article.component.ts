import {Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as toastr from 'toastr';
import { ProcessingModalAction } from '../actions/ProcessingModalAction';
import { AppStore } from '../common/AppStore';
import { AppState } from '../models/AppState';
import { RegisteredArticle } from '../models/RegisteredArticle';
import { ArticleService } from '../services/ArticleService';

@Component({
  selector: 'update-article-page',
  providers: [ ArticleService ],
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css']
})
export class UpdateArticleComponent implements OnInit, OnDestroy {

  isCompleted: boolean;

  isProcessing: boolean;

  article: RegisteredArticle;

  constructor(
    private activeRoute: ActivatedRoute,
    private articleService: ArticleService
  ) {
  }

  ngOnInit(): void {
    this.isProcessing = false;
    this.onChangeAppState = this.onChangeAppState.bind(this);
    AppStore.getInstance().registerHandler('CHANGE', this.onChangeAppState);
    this.readArticle();
  }

  ngOnDestroy(): void {
    AppStore.getInstance().removeHandler('CHANGE', this.onChangeAppState);
  }

  private readArticle(): void {
    ProcessingModalAction.setProcessingFlag(true);
    this.activeRoute.params
      .subscribe((param) => {
        this.articleService.findArticleById(Number.parseInt(param.id, 10))
          .subscribe(
            this.onReadArticles.bind(this),
            this.onError.bind(this)
          );
      });
  }
  
  private onReadArticles(articles: RegisteredArticle[]): void {
    if (articles.length === 0) {
      throw new RangeError('指定された記事が見つかりません');
    }
    this.article = articles[0];
    ProcessingModalAction.setProcessingFlag(false);
  }

  titleChanged(event: Event): void {
    this.article.title = (event.target as HTMLInputElement).value;
  }

  bodyChanged(event: Event): void {
    this.article.body = (event.target as HTMLInputElement).value;
  }

  updateButtonClicked(): void {
    ProcessingModalAction.setProcessingFlag(true);
    this.articleService.update(this.article.id, this.article).subscribe(
      this.onUpdateArticle.bind(this),
      this.onError.bind(this));
  }

  private onUpdateArticle(): void {
    toastr.success('更新完了');
    this.isCompleted = true;
    ProcessingModalAction.setProcessingFlag(false);
  }

  private onError(errorMessage: string): void {
    toastr.error(errorMessage);
    ProcessingModalAction.setProcessingFlag(false);
  }

  private onChangeAppState(eventName: string, beforeAppState: AppState, currentAppState: AppState): void {
    this.isProcessing = currentAppState.isProcessing;
  }

}
