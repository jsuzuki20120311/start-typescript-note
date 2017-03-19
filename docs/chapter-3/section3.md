### アクセス修飾子

TypeScriptでは、以下3種類のアクセス修飾子が使用できます。
何も指定しない場合、デフォルトで public となります。また、インタフェースで定義したプロパティとメソッドは自動的に public となり実装側で protected や private を指定するとトランスパイルエラーが発生します。

 * public ... 
 * protected ... 
 * private ... 

#### コンストラクのアクセス修飾子

TypeScript2.0から、以下のようにコンストラクタに private や protected が指定できるようになりました。(これまでは public しか指定できませんでした。)これにより、より安全に Sigleton パターンが使用できるようになりました。

```typescript
class Singleton {

  private static instance: Singleton;

  private constructor() {
    // do nothing
  }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

}
```

