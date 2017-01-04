'use strict';

import * as $ from 'jquery';
import 'bootstrap';
import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { AppState } from "../model/AppState";
import { AppStore } from '../common/AppStore';
import { ArticleService } from "../service/ArticleService";
import { RegisteredArticle } from "../model/RegisteredArticle";

@Component({
  selector: 'article-editor',
  providers: [ArticleService],
  template: `
    <div>
      article-editor
    </div>
  `
})
export class ArticleEditorComponent {

  constructor() {
    console.log('constructor');
  }

}
