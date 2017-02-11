import 'reflect-metadata';
import 'zone.js/dist/zone';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { Config } from './Config';

Config.initialize(true);
enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
