# 2章 Hello World

新たにプログラミング言語を学ぶ際や、プログラミングをはじめる環境が整ったことを確認する際には伝統的に『Hello World』という文字列を表示するプログラムを作成します。
ここでもそれに習い、ハローワールドプログラムを作ります。


## 2.1 ディレクトリ構成

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


## 2.2 helloworld.tsの作成

『helloworld.ts』という名前で新しくファイルを作成し、以下のコードを書きます。

```typescript
console.log('Hello World');
```


## 2.3 トランスパイル

『hellowold.ts』ファイルが作成できたら、以下のコマンドを実行し、TypeScriptからJavaScriptへの変換を行います。
この変換はコンパイルやトランスパイルあるいはトランスコンパイルなどと呼ばれます。本書ではトランスパイルに統一します。

```shell
$ tsc helloworld.ts
```

正常に完了したら、ディレクトリ内に『helloworld.js』ファイルが作成されていることを確認します。
この『helloworld.js』がトランスパイルされた結果であり、実際に実行されるコードが書かれたファイルです。

## 2.4 実行

正常にトランスパイルが完了したら、実際に実行します。
実行するには以下のコマンドを実行します。実行するのはトランスパイル後のファイルなので、指定するのは『helloworld.ts』ではなく『helloworld.js』である点に注意します。

```shell
$ node helloworld.js
```

ターミナルに『Hello World』が表示されたら完了です。


## 2.5 まとめ

* TypeScriptを使用し、ごく簡単なプログラムの作成し実行されることを確認しました。
* TypeScriptを使用して作成したソースコードは、JavaScriptへトランスパイルされる。
