## 4.1 サーバーサイドの開発

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

MySql5.7を使用します。
MySqlをまだインストールしてある場合、以下のSQLを発行しサンプルCRUDアプリケーション用のデータベースとテーブルを作成します。



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

    "body-parser": "^1.15.2",
    "ejs": "^2.5.6",
    "express": "^4.14.0",
    "mysql": "^2.11.1",
    "serve-favicon": "^2.4.0"

    "@types/body-parser": "0.0.34",
    "@types/ejs": "^2.3.33",
    "@types/express": "^4.0.33",
    "@types/mysql": "0.0.31",
    "@types/serve-favicon": "^2.2.28",
    "node-dev": "^3.1.3",
    "typescript": "^2.2.1"


```

ここでインストールしたモジュールは今後以下のように参照することが可能になります。

インストールしたモジュールそれぞれがどのようなものか確認しましょう。

#### body-parser

#### ejs

#### express

#### mysql 

#### serve-favicon

#### node-dev

#### typescript

#### @types/body-parser


    "@types/body-parser": "0.0.34",
    "@types/ejs": "^2.3.33",
    "@types/express": "^4.0.33",
    "@types/mysql": "0.0.31",
    "@types/serve-favicon": "^2.2.28",




```typescript
import * as mysql from 'mysql';
```
fromの後にモジュールのパッケージ名を指定します。


<div class="word-description">

npmとはなんでしょうか？

</div>







### ルーティング

#### 静的ファイルへのルーティング



### 新規作成機能

### 記事情報取得API

### 更新機能

### 削除機能

### 一覧取得API


