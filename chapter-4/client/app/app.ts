import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { Config } from './Config';

/**
 * 開発環境用エントリポイント
 */

Config.initialize(false);
platformBrowserDynamic().bootstrapModule(AppModule);
