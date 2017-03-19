### 型アノテーション

TypeScriptでは、型アノテーションを使用して、変数に静的に型を指定することができます。

以下のように型アノテーションは変数名の後に指定し、間に :(コロン) をつけます。

```typescript
let hoge: number = 1;
```

クラスのプロパティに指定する場合以下のようになります。

```typescript
class Hoge {

  private fuga: string;

  constructor(fuga: string) {
    this.fuga = fuga;
  }

}
```

