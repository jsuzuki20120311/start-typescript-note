'use strict';

import { RegisteredArticle } from "./RegisteredArticle";

export interface AppState {

  articles: RegisteredArticle[];

  isProcessing: boolean;

}
