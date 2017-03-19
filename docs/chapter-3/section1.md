### インタフェース

EcmaScript2015に無い機能としてインタフェースがあります。インタフェースにはプロパティとメソッドの定義のみができ、実装することはできません。たとえば、以下のRunnableインタフェースは string型のnameプロパティと、booleanを返すrunメソッドが定義されています。

なお、トランスパイル後のJavaScriptにインタフェースと対応するコードは出力されません。

```typescript
interface Runnable {

  name: string;

  run(): boolean;
}
```

上記Runnableインタフェースを実装したTaskクラスを作る場合、以下ように implementsキーワードを使用します。

implementsキーワードを使用してインタフェースを指定することで、そのクラスにインタフェースで定義したプロパティとメソッドの実装を強制させることができます。インタフェースで定義したプロパティとメソッドがどれか1つでも実装されていない場合トランスパイルでエラーが発生します。

```typescript
class Task implements Runnable {

  name: string

  constructor(name: string) {
    this.name = name;
  }

  run(): boolean {
    let result = false;
    // 何か処理をする
    return result;
  }
}
```
