##　4.2 クライアントサイドの開発

サーバーサイドの開発が一通り完了したので、次はクライアントサイドの開発を進めていきます。


### package.jsonの作成

サーバーサイドの開発時の同様、package.json を作成します。

```shell
$ npm init -y
```

実行後、プロジェクトディレクトリに package.json ができていることを確認しましょう。


### 4.2.1 tsconfig.jsonの作成

tsconfig.jsonに関してもサーバーサイド開発時同様ファイルを作成します。
クライアントサイド用のtsconfig.jsonは以下の内容にします。

```json
{
  "compilerOptions": {
    "target": "ES5",
    "module": "commonjs",
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "noImplicitAny": true,
    "suppressImplicitAnyIndexErrors": true,
    "lib": ["es2015", "dom"],
    "typeRoots": [
      "./node_modules/@types"
    ],
    "alwaysStrict": true
  },
  "compileOnSave": true,
  "exclude": [
    "node_modules",
    "**/*-aot.ts"
  ]
}
```


### 4.2.1 モジュールのインストール


#### 4.2.1.1 Angular2関連モジュールのインストール

サーバーサイドの開発時と同様npmを使用して必要なモジュールをインストールします。
以下のコマンドを実行し、

```shell
$ npm install ...
```

#### 4.2.1.2 型定義ファイルのインストール

前節でインストールしたモジュールの中には、型定義を別途準備する必要があるモジュールが存在するため、
型定義をインストールします。

```shell

```


#### 4.2.1.3 ビルドで使用するモジュールのインストール

クライアントサイドのビルドではいくつかのモジュールをインストールする必要があります。
以下のコマンドを実行し必要なモジュールをインストールします。

```shell

```



### 4.2.1.4 その他のモジュールをインストール


```shell

```

<div>
毎回こんなにたくさんのコマンドを実行しなくてはいけないのですか?指が疲労骨折してしまいます！


package.jsonをSVNやGITなどのバージョン管理ソフトで管理しましょう。
そうしたなら、各自 npm install コマンドを実行すればpackage.jsonで管理されたモジュールがすべてインストールされます。
あなたの指を疲労骨折させるには及びません。

</div>



toastrはトースト通知を簡単に実装するためのライブラリです。今回はサーバーとの通信結果を表示する用途でトースト通知を使用します。


また、見た目をそれなりに整えるために、今回はSkeletonというCSSフレームワークを使用します。
Skeletonはグリッドシステムやボタンなど、使用頻度の高いスタイルのみを定義している非常に学習コストの低いフレームワークです。
CSSフレームワークにはBootstrapやMaterial Design Liteなどよりリッチな物が存在しますが、
今回はサンプルのためそれほど見た目にはこだわらないためSkeletonを使用します。


http://getskeleton.com/


ダウンロードは以下のWebサイトからダウンロードします。
ダウンロードしZIPファイルを解答したら、normalize.cssとskeleton.cssをstylesディレクトリ内に配置します。

これで一通り必要なモジュールのインストールが完了しました。




