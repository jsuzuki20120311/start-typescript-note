import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as toastr from 'toastr';
import { ProcessingModalAction } from '../actions/ProcessingModalAction';
import { RegisteredArticle } from '../models/RegisteredArticle';
import { ArticleService } from '../services/ArticleService';


@Component({
  selector: 'view-article-page',
  providers: [ArticleService],
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css']
})
export class ViewArticleComponent implements OnInit {

  article: RegisteredArticle;

  constructor(private activeRoute: ActivatedRoute, private articleService: ArticleService) {

  }

  ngOnInit(): void {
    this.readArticle();
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

  private onError(errorMessage: string): void {
    toastr.error(errorMessage);
    ProcessingModalAction.setProcessingFlag(false);
  }

}
