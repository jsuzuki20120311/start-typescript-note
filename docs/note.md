# TypeScript + express + Angular2 でつくるシングルページアプリケーション





### TypeScriptのインストール

以下のコマンドを実行し、TypeScriptをインストールします。

```shell
$ npm install typescript -g
```

以下のコマンドで、バージョンが表示されたるかどうか確認しましょう。

```
$ tsc -v
```

これでTypeScriptで記述したファイルをJavaScriptにトランスパイルするこができるようになりました。



## Hello World

開発環境の準備ができたので、ごく簡単なプログラムを作成して開発環境がちゃんとできているか確認します。

ここは古典に倣い Hello World の文字列を表示するプログラムを作成します。

まずは適当な場所にプロジェクトディレクトリを作成し、Visual Studio Codeで開きます。
Visal Studio Code にはエディタ内でターミナルを開く機能があるので、以降のコマンドはそちらで実行すると楽。

### package.jsonの作成

まずは package.json を作成します。

```shell
$ npm init -y
```

実行後、プロジェクトディレクトリに package.json ができていることを確認しましょう。


### tsconfig.jsonの作成

tsconfig.jsonという名前のファイルをプロジェクトディレクトリに作成します。
これはトランスパイルする際のオプションなどを設定するファイルです。
とりあえず今回は以下の内容で作成します。

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





### ライブラリのインストール

ここではjQueryのインストールを例に手順をみていきます。まずは、Express本体をインストールします。

```shell
$ npm install jquery --save
```

