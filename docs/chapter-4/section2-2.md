### 4.2.2 ビルドタスクの設定

必要なモジュールを一通り準備できたら、ビルド設定を行います。
クライアントサイドのJavaScriptを実行するのはブラウザですが、2017年現在ブラウザは以下のような構文に対応していません。
そのため、ブラウザが実行できる形にJavaScriptファイルを出力する必要があります。

```typescript

import * as $ from 'jquery';

```

今回ビルドタスクの中で行わなければいけない処理は以下のつです。

* import構文やexport構文などの依存関係を解決

* TypeScriptからJavaScriptへのトランスパイル

* 依存関係の解決されたファイルをサーバーサイドプロジェクトの静的ファイル用ディレクトリであるpublicディレクトリへ出力

* その他クライアントサイドのプロジェクトで管理しているファイルをファイル用ディレクトリであるpublicディレクトリへコピー



解決しなければいけない問題を一つ一つ見ていきます。
一つ目の『依存関係の解決』にはwebpackを使用します。
また、二つ目の『TypeScriptからJavaScriptへの変換』はts-loaderを通してTypeScriptを使用します。
ts-loaderを使用することで、webpackでトランスパイルを行えるようにします。
３つ目はwebpackの設定ファイルの
４つ目もwebpack

なんということでしょう、すべてwebpackへの設定で完結してしまいました。
それではwebpackの設定ファイルを作成します。
webpackの設定ファイルは『webpack.config.js』という名前で作成します。

```webpack.config.js

var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');
var helpers = require('./helpers');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: process.env.NODE_ENV === 'production' ? './app/product-app.ts' : './app/app.ts',
    vendor: './app/vendor.ts'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  output: {
    path: '../server/public/',
    filename: '[name].js'
  },
  plugins: [
    new CopyWebpackPlugin([
        {
          from: './index.html',
          to: './'
        },
        {
          from: './styles/*.css',
          to: './'
        },
        {
          from: './favicon.png',
          to: './'
        },
        {
          from: './app/**/*.html',
          to: './',
          flatten: true
        },
        {
          from: './app/**/*.css',
          to: './',
          flatten: true
        }
      ],
      {
        ignore: [ '.DS_Store', '.gitkeep' ]
      }
    ),
    new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('./src'), // location of your src
        {} // a map of your routes
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor']
    })
  ],
  resolve: {
    extensions: ['.ts', '.js', '.html', '.css']
  }
};

```


<div>

このビルド設定では開発中にpublicディレクトリ以下に不要なファイルが残り続けるのではないでしょうか？
私はこういういい加減な仕事が大嫌いです。

riframを使用します。


</div>



### index.htmlの作成

エントリポイントとなるHTMLファイルを作成します。以下の内容でindex.htmlという名前で新規ファイルを作成します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- skeleton css -->
  <link rel="stylesheet" href="/styles/normalize.css">
  <link rel="stylesheet" href="/styles/skeleton.css">
  <!-- toastr 用css -->
  <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.css'>
  <title>Sample CRUD Application</title>
  <base href="/">
</head>
<body>
  <noscript>
    このWebサイトの全ての機能を利用するためにはJavaScriptを有効にする必要があります。
    <a href="http://www.enable-javascript.com/ja/" target="_blank">あなたのWebブラウザーでJavaScriptを有効にする方法</a>を参照してください。
  </noscript>
  <app>
    Now loading...
  </app>
  <script src="/vendor.js"></script>
  <script src="/app.js"></script>
</body>
</html>
```


### エントリポイントの作成



### コンポーネントの作成



### クライアントサイドルーティング



### サービスクラスの作成



