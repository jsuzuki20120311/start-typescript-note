import { Component, OnInit } from '@angular/core';
import { ArticleService } from "../service/ArticleService";
import { RegisteredArticle } from "../model/RegisteredArticle";
import { ActivatedRoute } from '@angular/router';
import { ProcessingModalAction } from '../action/ProcessingModalAction';

@Component({
  selector: 'update-article-page',
  providers: [ ArticleService ],
  template: `
    <h2>記事の更新</h2>
    <div *ngIf="!isCompleted">
      <div *ngIf="article" class="container">
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
              [attr.disabled]="isProcessing ? true : null"
              (click)="updateButtonClicked()">
            更新
          </button>
          <button class="btn btn-danger" 
              [attr.disabled]="isProcessing ? true : null"
              (click)="deleteButtonClicked()">
            削除
          </button>
        </form>
      </div>
    </div>
    <div *ngIf="isCompleted">
      完了しました。
    </div>
  `
})
export class UpdateArticlePageComponent implements OnInit {

  private isCompleted: boolean;

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
    this.isProcessing = true;
    ProcessingModalAction.setProcessingFlag(true);
    this.articleService.update(this.article.id, this.article).subscribe(() => {
      ProcessingModalAction.setProcessingFlag(false);
      this.isCompleted = true;
    });
  }

  private deleteButtonClicked(): void {
    this.isProcessing = true;
    ProcessingModalAction.setProcessingFlag(true);
    this.articleService.delete(this.article.id).subscribe(() => {
      ProcessingModalAction.setProcessingFlag(false);
      this.isCompleted = true;
    });
  }

}
