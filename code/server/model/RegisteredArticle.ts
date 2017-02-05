'use strict';

import { Article } from "./Article";
import { RegisteredItem } from "./RegisteredItem";

/**
 * 登録済記事インタフェース
 */
export interface RegisteredArticle extends Article, RegisteredItem {

}
