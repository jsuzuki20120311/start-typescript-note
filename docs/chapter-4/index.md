# 4章 CURUDアプリケーションの作成

2章でごく簡単なプログラムをTypeScriptを用いて実行し、3章でTypeScriptの代表的な機能を確認しました。
4章では、もう少し実践的にCRUDアプリケーションの作成をしていきます。
もちろんTypeScriptを使用して。

以下のような機能を持った記事管理アプリケーションを作成します。

* 記事の投稿

* 記事の閲覧

* 記事の更新

* 記事の削除


<div class="word-description">
## CRUDとは
CREATE、READ、UPDATE、DELETEの頭文字をとった略語です。
</div>


## 設計

### サーバーサイド

今回はExpressフレームワークをTypeScriptを通して使用します。
基本WebAPIを使用

レスポンスで返すデータ形式はjsonで統一します。

コントローラクラス

サービスクラス

DAOクラス

の３層

ルーティングはExpressのRouterクラスの機能を使用する

<div class="word-description">
## Express

ExpressはNode.js用サーバーサイドWebフレームワークです。
非常にシンプル

URL: http://expressjs.com/ja/
</div>

```
server
  config/
  controllers/
  dao/
  models/
  public/
  routes/
  views/
  www/
  app.ts
```


### クライアントサイド

Angular2を使用する。

#### ディレクトリ構成

```
client
  index.html
  favicon.png
  styles/
  app/
```



<div class="word-description">

# Angular

Googleが開発を主導するフロントエンド用フレームワークです。

URL: https://angular.io/
</div>



### データベース

今回はMySql5.7を使用します。


## 開発

実際にコードを書き始める前にいくつかの設定ファイルを作成し、それらの設定が間違いなく完了しているか確認します。
まずはサーバーサイドの設定から始めます。


### package.jsonの作成

serverとclientディレクトリの両方で以下のコマンドを実行します。完了したら両方のディレクトリ直下にpackage.jsonが作成されていることを確認します。

```shell
$ npm init -y
```
<div class="word-description">

package.jsonとはなんでしょうか？

</div>


### 必要なモジュールのインストール

はじめにnpmを使用して必要なモジュールをインストールします。

```shell


```

ここでインストールしたモジュールは今後以下のように参照することが可能になります。

```typescript
import * as mysql from 'mysql';
```
fromの後にモジュールのパッケージ名を指定します。


<div class="word-description">

npmとはなんでしょうか？

</div>


### ルーティングの設定確認







