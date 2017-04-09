import { AppStore } from '../common/AppStore';
import { RegisteredArticle } from '../models/RegisteredArticle';

export class ArticleAction {

  static change(articles: RegisteredArticle[]) {
    AppStore.getInstance().applyAppState('CHANGE', {
      articles: articles
    });
  }

}
