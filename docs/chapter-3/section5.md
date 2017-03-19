### 型定義のインストール

TypeScriptではJavaScriptのライブラリを使用できます。しかし、何もしなければライブラリのソースコードはJavaScriptで書かれているため型の情報がありません。そのため、ライブラリのインストールといっしょに型定義ファイルをインストールする必要があります。
次に型定義ファイルをインストールします。型定義のインストールには、以前は tsd や Typings などのツールを使用していましたが、2.0からは npm だけで完結するようになりました。

```shell
$ npm install @types/jquery --save
```

型定義ファイルが既に存在するかどうかは
[TypeSearch](http://microsoft.github.io/TypeSearch/)
で検索できます。
