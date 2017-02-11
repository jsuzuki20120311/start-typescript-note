import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Routes } from './Routes';
import { AppComponent } from './component/app.component';
import { ArticleListComponent } from './component/ArticleList.component';
import { ArticleEditorComponent } from './component/ArticleEditor.component';
import { UpdateArticlePageComponent } from './component/update-article-page.component';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    ArticleListComponent,
    ArticleEditorComponent,
    UpdateArticlePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes.CONFIG)
  ]
})
export class AppModule {

  constructor() {

  }

}
