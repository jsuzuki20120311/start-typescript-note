import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Routes } from './Routes';

import { AppComponent } from './components/app.component';
import { ArticleListComponent } from './components/article-list.component';
import { ArticleEditorComponent } from './components/article-editor.component';
import { UpdateArticlePageComponent } from './components/update-article-page.component';

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

}
