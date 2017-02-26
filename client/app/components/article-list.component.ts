import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { AppStore } from '../common/AppStore';
import { ArticleService } from "../services/ArticleService";
import { AppState } from "../models/AppState";
import { RegisteredArticle } from "../models/RegisteredArticle";
import { ArticleAction } from '../actions/ArticleAction';
import { ProcessingModalAction } from '../actions/ProcessingModalAction';

@Component({
    selector: 'article-list',
    providers: [ ArticleService ],
    templateUrl: 'article-list.component.html'
})
export class ArticleListComponent implements OnInit, OnDestroy {

    private htmlElement: HTMLElement;

    articles: RegisteredArticle[];

    isProcessing: boolean;

    selectedArticle: RegisteredArticle;

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

    titleChanged(event: Event): void {
        this.selectedArticle.title = (event.target as HTMLInputElement).value;
    }

    bodyChanged(event: Event): void {
        this.selectedArticle.body = (event.target as HTMLInputElement).value;
    }

}
