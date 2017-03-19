# 5章 その他のTips


### Visual Studio Codeのダウンロード

今回は TypeScript の本家本元 Microsof が開発したエディタ Visual Studio Code を使用します。
以下のURLからダウンロードしインストールします。
Visual Studioと異なり、Visual Studio CodeはWindows版だけでなくMac版とLinux版も用意されています。

[Visual Studio Code](http://code.visualstudio.com/)



### Visual Studio Codeの設定

#### トランスパイルタスクの設定

Visual Studio Codeにはタスクランナーという機能があるので、この機能を使ってトランスパイルの実行を設定します。

Command + Shift + P キーを押してコマンドパレットを表示し、tasks と入力して「タスクランナーの構成」を選びます。

![visual-studio-code-capture](../image/20160926010902.png "画像タイトル")

![visual-studio-code-capture](../image/20160926010917.png "画像タイトル")

選択後、.vscode フォルダの下に task.json ができていることを確認します。


#### 使用するTypeScriptの設定

Visual Studio Code側でデフォルトで使用されるTypeScriptは1.8が指定されている場合があります。

既にTypeScript2がリリースされいてるので、最新のTypeScriptの機能を使用する場合、設定を変更する必要があります。

プロジェクトディレクトリ内のTypeScriptを使用する場合、以下のコマンドを実行します。

```
$ npm install typescript --save-dev
```

設定変更の手順は以下の通り。

「基本設定」→「ワークスペースの設定」

![visual-studio-code-capture](../image/20160926005606.png "画像タイトル")

画面右側に、使用するTypeScriptのパスを設定します。

![visual-studio-code-capture](../image/20160926005842.png "画像タイトル")


#### トランスパイルタスクの実行

タスクの設定が正しく行われていれば、Command + Shift + B を押すと、トランスパイルが行われます。

トランスパイルに成功したら、ディレクトリ内に hoge.js ファイルが出力されいているはずです。


#### デバッグの設定

Visual Studio Codeではデバッグ設定を行うと、エディタ内でデバッグを行えます。
設定をするには　F5 キーを押し、Node.jsを選択します。

![visual-studio-code-capture](../image/2016-10-10%2017.52.59.png "画像タイトル")

launch.json が開いたら、program属性の値(画像だと8行目)を実行するJavaScriptファイルに指定しなおします。

![visual-studio-code-capture](../image/2016-10-10%2018.03.31.png "画像タイトル")

今回の場合

```json
"program": "${workspaceRoot}/hoge.js",
```

に変更します。変更後は保存を忘れずに。

また、デバッグをする際、ステップ実行もしたい場合、11行目の "sourceMaps"の値を false に設定します。


#### プログラムの実行

Visual Studo Codeで実行するにはエディタ画面左側の虫アイコンタブを選択し、実行ボタンを押します。

ソースコードに間違いがなく、設定が間違っていないなら、デバッグコンソールに 「Hello World」が出力されるはずです。

![visual-studio-code-capture](../image/2016-10-10%2019.05.22.png "画像タイトル")
