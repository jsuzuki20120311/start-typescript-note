import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { Config } from './Config';

/**
 * 本番環境用エントリポイント
 */

Config.initialize(true);
enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
