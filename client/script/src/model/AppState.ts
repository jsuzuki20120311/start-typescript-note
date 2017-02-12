import { RegisteredArticle } from "./RegisteredArticle";


/**
 * クライアント側アプリケーション全体の状態
 */
export interface AppState {

  articles: RegisteredArticle[];

  isProcessing: boolean;

}
