import { ArticleListComponent } from './components/article-list.component';
import { ArticleEditorComponent } from './components/article-editor.component';
import { UpdateArticlePageComponent } from './components/update-article-page.component';

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
