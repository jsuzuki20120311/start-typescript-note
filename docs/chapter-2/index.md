# 2章 Hello World

新たにプログラミング言語を学ぶ際や、プログラミングをはじめる環境が整ったことを確認する際には伝統的に『Hello World』という文字列を表示するプログラムを作成します。
ここでもそれに習います。


## ディレクトリ構成

```
chapter-2
  src
    helloworld.ts
```


<!--
## package.jsonの作成

以下のコマンドを実行し、ディレクトリ内にpackage.jsonが作成されていることを確認します。

```
$ npm init -y
```
-->


## TypeScriptのインストール

TypeScriptを使用してプログラミングをはじめるためには、いくつかの前準備をする必要があります。そのうちの一つがTypeScriptのインストールです。

```shell
$ node install typescript --save-dev
```


## helloworld.tsの作成

『helloworld.ts』という名前で新しくファイルを作成し、以下のコードを書きます。

```typescript
console.log('Hello World');
```

## トランスパイル

『hellowold.ts』ファイルが作成できたら、以下のコマンドを実行し、TypeScriptからJavaScriptへの変換を行います。
この変換はコンパイルやトランスパイルあるいはトランスコンパイルなどと呼ばれます。本書ではトランスパイルに統一します。

```shell
$ tsc helloworld.ts
```

正常に完了したら、ディレクトリ内に『helloworld.js』ファイルが作成されていることを確認します。
この『helloworld.js』がトランスパイルされた結果であり、実際に実行されるコードが書かれたファイルです。

## 実行

正常にトランスパイルが完了したら、実際に実行します。
実行するには以下のコマンドを実行します。実行するのはトランスパイル後のファイルなので、指定するのは『helloworld.ts』ではなく『helloworld.js』である点に注意します。

```shell
$ node helloworld.js
```

ターミナルに『Hello World』が表示されたら完了です。
