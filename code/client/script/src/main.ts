import 'reflect-metadata';
import 'zone.js/dist/zone';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { Config } from './Config';

Config.initialize(false);
platformBrowserDynamic().bootstrapModule(AppModule);
