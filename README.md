# TypeScriptでつくるシングルページアプリケーション

## このリポジトリについて

技術書典2で販売した同人誌『TypeScriptでつくるシングルページアプリケーション』のソース用リポジトリです。

## 技術書典2について

2017年4月9日(日)に秋葉原で行われた技術書オンリーイベントです。

[技術書典2](https://techbookfest.org/event/tbf02)

## 本文用ソース

イベントで販売した本のソースとしてワードファイルをおいてあります。

[本文ワードファイル](https://github.com/jsuzuki20120311/start-typescript-note/blob/master/book/body.docx)


## 第2章用ソースコード

[第二章のソースコード](https://github.com/jsuzuki20120311/start-typescript-note/tree/master/chapter-2)


## 第4章用ソースコード

[第四章のソースコード](https://github.com/jsuzuki20120311/start-typescript-note/tree/master/chapter-4)

### 第4章のソースコードの動かし方

とりあえず動かすまでのメモ。
端末を開き、以下のコマンドを実行します。

なお、MySQLの準備については、4章の本文を見つつ、各自準備して下さい。

#### 4.2 サーバーサイドのモジュールのインストール

```shell

$ cd [クローンしたディレクトリ]

$ cd ./chapter-4

$ cd ./client

$ npm install

```

#### 4.2 フロントエンドのモジュールのインストール

```shell

$ cd [クローンしたディレクトリ]

$ cd ./chapter-4

$ cd ./client

$ npm install

```


### 4.3 サーバーサイドビルド


```shell

$ cd [クローンしたディレクトリ]

$ cd ./chapter-4

$ cd ./server

$ npm run build

```

### 4.4 フロントエンドのビルド


```shell

$ cd [クローンしたディレクトリ]

$ cd ./chapter-4

$ cd ./client

$ npm run build

```

#### 4.5 サーバーサイドの起動

```
$ cd [クローンしたディレクトリ]/chapter-4/server

$ npm start

```


#### 4.5 確認

以下のURLをブラウザで開きます。

```$xslt
http://localhost:3000
```

CRUDアプリが立ち上がれば完了です。
