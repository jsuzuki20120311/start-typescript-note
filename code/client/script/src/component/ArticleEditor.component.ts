import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ProcessingModalAction } from '../action/ProcessingModalAction';
import { AppState } from '../model/AppState';
import { Article } from '../model/Article';
import { RegisteredArticle } from "../model/RegisteredArticle";
import { AppStore } from '../common/AppStore';
import { ArticleService } from "../service/ArticleService";

@Component({
  selector: 'article-editor',
  providers: [ ArticleService ],
  template: `
    <h2>記事の作成</h2>
    <div *ngIf="!isCompleted">
      <div class="container">
        <form>
          <div class="form-group">
            <label>記事タイトル</label>
            <input type="text" 
                placeholder="タイトル"
                class="form-control" 
                value="{{ article.title }}" 
                (change)="titleChanged($event)" 
                [attr.disabled]="isProcessing ? true : null">
          </div>
          <div class="form-group">
            <label>本文</label>
            <textarea placeholder="本文" 
                rows="10"
                (change)="bodyChanged($event)"
                class="form-control" 
                value="{{ article.body }}"
                [attr.disabled]="isProcessing ? true : null">
            </textarea>
          </div>
          <button class="btn btn-primary" 
              data-dismiss="modal" 
              (click)="registerButtonClicked()" 
              [attr.disabled]="isProcessing ? true : null">
            登録
          </button>
        </form>
      </div>
    </div>
    <div *ngIf="isCompleted">
      完了しました。
    </div>
  `
})
export class ArticleEditorComponent {

  private article: Article;

  private isProcessing: boolean;

  private isCompleted: boolean;

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

  private titleChanged(event: Event): void {
    this.article.title = (event.target as HTMLInputElement).value;
  }

  private bodyChanged(event: Event): void {
    this.article.body = (event.target as HTMLInputElement).value;
  }

  private registerButtonClicked(): void {
    ProcessingModalAction.setProcessingFlag(true);
    this.articleService.create(this.article).subscribe(() => {
      ProcessingModalAction.setProcessingFlag(false);
      this.isCompleted = true;
    });
  }

  private onChangeAppState(eventName: string, beforeAppState: AppState, currentAppState: AppState): void {
    this.isProcessing = currentAppState.isProcessing;
  }

}
