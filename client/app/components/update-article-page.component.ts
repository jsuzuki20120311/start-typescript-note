import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProcessingModalAction } from '../actions/ProcessingModalAction';
import { RegisteredArticle } from '../models/RegisteredArticle';
import { ArticleService } from '../services/ArticleService';

@Component({
  selector: 'update-article-page',
  providers: [ ArticleService ],
  templateUrl: './update-article-page.component.html'
})
export class UpdateArticlePageComponent implements OnInit {

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
    ProcessingModalAction.setProcessingFlag(true);
    this.activeRoute.params.subscribe((params) => {
      this.articleService.findArticleById(parseInt(params['id'], 10)).subscribe((articles) => {
        this.article = articles[0];
        ProcessingModalAction.setProcessingFlag(false);
      });
    });
  }

  titleChanged(event: Event): void {
    this.article.title = (event.target as HTMLInputElement).value;
  }

  bodyChanged(event: Event): void {
    this.article.body = (event.target as HTMLInputElement).value;
  }

  updateButtonClicked(): void {
    this.isProcessing = true;
    ProcessingModalAction.setProcessingFlag(true);
    this.articleService.update(this.article.id, this.article).subscribe(() => {
      ProcessingModalAction.setProcessingFlag(false);
      this.isCompleted = true;
    });
  }

  deleteButtonClicked(): void {
    this.isProcessing = true;
    ProcessingModalAction.setProcessingFlag(true);
    this.articleService.delete(this.article.id).subscribe(() => {
      ProcessingModalAction.setProcessingFlag(false);
      this.isCompleted = true;
    });
  }

}
