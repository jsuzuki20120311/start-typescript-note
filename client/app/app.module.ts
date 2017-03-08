import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './components/app.component';
import { ArticleListComponent } from './components/article-list.component';
import { CreateArticleComponent } from './components/create-article.component';
import { UpdateArticleComponent } from './components/update-article.component';
import { ViewArticleComponent } from './components/view-article.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    ArticleListComponent,
    CreateArticleComponent,
    UpdateArticleComponent,
    ViewArticleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: ArticleListComponent
      },
      {
        path: 'createArticle',
        component: CreateArticleComponent
      },
      {
        path: 'viewArticle/:id',
        component: ViewArticleComponent
      },
      {
        path: 'updateArticle/:id',
        component: UpdateArticleComponent
      }
    ])
  ]
})
export class AppModule {

}
