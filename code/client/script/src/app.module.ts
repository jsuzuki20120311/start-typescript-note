'use strict';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Routes } from './Routes';
import { AppComponent } from './component/app.component';
import { ArticleListComponent } from './component/ArticleList.component';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    ArticleListComponent
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
