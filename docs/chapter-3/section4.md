### 構造的部分型

TypeScriptには、JavaやC#のようなクラスベースのオブジェクト指向プログラミング言語とは異なる考え方に、構造的部分型があります。

構造的部分型とは、型の派生関係を extends や implements からではなく、オブジェクトの構造から判断する仕組みのことです。

例えばJavaにおいて以下のような異なる2つの、但し構造は同じインタフェースがあり、それぞれに実装したクラスがあったとします。


Flyable.java

```java
public interface Flyable {
  void fly();
}
```

Dragon.java

```java
public interface Dragon {
  void fly();
}
```

Raven.java

```java
public class Raven implements Flyable {
    public void fly() {
        System.out.println("fly");
    }
}

```


BlueDragon.java

```java
public class BlueDragon implements Dragon {
  public void fly() {
    System.out.println("fly");
  }
}
```

その上で、以下のような処理を書いた場合、9行目でコンパイルエラーが発生します。

Main.java

```java
public class Main {

    public static void main(String[] args) {
        Main main = new Main();

        Flyable raven = new Raven();
        Dragon blueDragon = new BlueDragon();
        main.register(raven);
        main.register(blueDragon);
    }

    private void register(Flyable flyable) {
        // do something
    }

}
```

それはBlueDragonクラスがFlyableインタフェースを実装しておらず、Javaが構造ではなくextends や implements キーワードを元に型の派生関係を判断しているためです。

一方で、TypeScriptで似たようなコードを書いた場合トランスパイルエラーが発生しません。

Flyable.ts

```typescript
interface Flyable {

    fly(): void;
}

export default Flyable;
```

Dragon.ts

```typescript
interface Dragon {

    fly(): void;
}

export default Dragon;
```

Raven.ts

```typescript
import Flyable from './Flyable';

class Raven implements Flyable {

  fly(): void {
    console.log('fly');  
  }
}

export default Raven;
```

BlueDragon.ts

```typescript
import Dragon from './Dragon';

class BlueDragon implements Dragon {

  fly(): void {
    console.log('fly');  
  }
}

export default BlueDragon;
```

Javaのケースではコンパイルエラーが起きた行に相当する17行目があっても、TypeScriptではトランスパイルエラーは発生しません。これは構造が同じためです。

Main.ts

```typescript
import BlueDragon from './models/BlueDragon';
import Raven from './models/Raven';
import Flyable from './models/Flyable';

class Main {

  register(flyable: Flyable): void {
    flyable.fly();
  }
}

let main = new Main();

let raven = new Raven();
let blueDragon = new BlueDragon();
main.register(raven);
main.register(blueDragon);
```
