# 1章 環境構築

まずは環境構築を行います。1章に関しては、自身の端末の状況と比較して適宜


また執筆時点での筆者マシン環境も参考程度に乗せておきます。

* OS ubuntu 16.0.4 LTS

* Node.js v6.10.0

* npm 3.10.10


## nodebrewのインストール

Node.jsは更新頻度が高いと言われており、

```
$ curl -L git.io/nodebrew | perl - setup
```

.bashrcを編集します。



## 環境変数の設定

前節ですでにnodeとnpmのバージョンが確認できた場合、ここでの手順は不要になります。

```.bash_profile

```




## Node.jsのインストール

Node.jsをインストールされていない場合、以下のURLからダウンロードしインストールします。

[Node.js](https://nodejs.org/en/)

インストールが完了したら、以下のコマンドを実行しバージョンを確認しましょう。

```shell
$ node --version
```


## TypeScriptのインストール

次にTypeScriptをインストールします。TypeScriptのインストールにはnpmコマンドを使用します。

```shell
$ npm install typescript -global
```


## 開発環境について

エディタについては使い慣れたエディタがあればそれを使用するのが一番ですが、ここでは筆者が実際に使用したことがあり、TypeScriptを使用するのにおすすめのエディタを紹介します。

### VisualStudioCode

TypeScript開発元と同じMicrosoft製のエディタです。


### WebStorm

VisualStudioCodeと異なりこちらは有料ですが、
OSSの開発を行っている場合、無料のライセンスもあるらしい。

