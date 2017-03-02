import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProcessingModalAction } from '../actions/ProcessingModalAction';
import { AppState } from '../models/AppState';
import { Article } from '../models/Article';
import { AppStore } from '../common/AppStore';
import { ArticleService } from '../services/ArticleService';

@Component({
  selector: 'article-editor',
  providers: [ArticleService],
  templateUrl: './article-editor.component.html'
})
export class ArticleEditorComponent implements OnInit, OnDestroy {

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
    this.articleService.create(this.article).subscribe(() => {
      ProcessingModalAction.setProcessingFlag(false);
      this.isCompleted = true;
    });
  }

  private onChangeAppState(eventName: string, beforeAppState: AppState, currentAppState: AppState): void {
    this.isProcessing = currentAppState.isProcessing;
  }

}
