'use strict';

import { ArticleListComponent } from './component/ArticleList.component';
import { ArticleEditorComponent } from './component/ArticleEditor.component';

export class Routes {

  public static readonly CONFIG = [
    {
      path: 'article-list',
      component: ArticleListComponent
    },
    {
      path: '',
      component: ArticleEditorComponent
    }
  ];

}
