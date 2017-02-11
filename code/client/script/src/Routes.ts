import { ArticleListComponent } from './component/article-list.component';
import { ArticleEditorComponent } from './component/article-editor.component';
import { UpdateArticlePageComponent } from './component/update-article-page.component';

export class Routes {

  public static readonly CONFIG = [
    {
      path: '',
      component: ArticleListComponent
    },
    {
      path: 'article-list',
      component: ArticleListComponent
    },
    {
      path: 'article-editor',
      component: ArticleEditorComponent
    },
    {
      path: 'update-article/:id',
      component: UpdateArticlePageComponent
    }
  ];

}
