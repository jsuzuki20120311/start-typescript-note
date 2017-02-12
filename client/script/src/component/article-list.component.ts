import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { AppStore } from '../common/AppStore';
import { ArticleService } from "../service/ArticleService";
import { AppState } from "../model/AppState";
import { RegisteredArticle } from "../model/RegisteredArticle";
import { ArticleAction } from '../action/ArticleAction';
import { ProcessingModalAction } from '../action/ProcessingModalAction';

@Component({
    selector: 'article-list',
    providers: [ ArticleService ],
    template: `
    <h2>記事</h2>
    <table class="table" *ngIf="articles">
      <tr>
        <th>id</th>
        <th>タイトル</th>
        <th>作成日時</th>
        <th>更新日時</th>
        <th>操作</th>
      </tr>
      <tr *ngFor="let article of articles">
        <td>{{ article.id }}</td>
        <td>{{ article.title }}</td>
        <td>{{ article.createdAt }}</td>
        <td>{{ article.updatedAt }}</td>
        <td>
          <a [routerLink]="['/update-article', article.id]">
            <button class="btn btn-primary"> 
              編集
            </button>
          </a>
        </td>
      </tr>
    </table>
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
    ) {
        this.isProcessing = false;
        this.htmlElement = this.elementRef.nativeElement;
    }

    ngOnInit(): void {
        this.onChangeAppState = this.onChangeAppState.bind(this);
        AppStore.getInstance().registerHandler('CHANGE', this.onChangeAppState);
        ProcessingModalAction.setProcessingFlag(true);
        this.articleService.findAllArticles().subscribe((registerdArticles) => {
            ArticleAction.change(registerdArticles);
        }, (error) => {
            console.error(error);
        }, () => {
            ProcessingModalAction.setProcessingFlag(false);
        });
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

}
