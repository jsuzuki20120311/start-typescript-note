'use strict';

import { AppState } from '../models/AppState';


interface Handler {
  (eventName: string, beforeState: AppState, currentState: AppState) :void
}


interface EmitInfo {
  eventName: string;
  handlers: Handler[];
}


export class AppStore {

  private static instance: AppStore;

  private appState: AppState;

  private emitInfoList: EmitInfo[];

  static getInstance(): AppStore {
    if (!AppStore.instance) {
      AppStore.instance = new AppStore();
    }
    return AppStore.instance;
  }

  private constructor() {
    this.appState = {
      articles: [],
      isProcessing: false
    };
    this.emitInfoList = [];
  }

  getAppState(): AppState {
    return this.appState;
  }

  applyAppState(eventName: string, chagedState: any): void {
    const emitInfo = this.emitInfoList.find((emitInfo: EmitInfo) => {
      return emitInfo.eventName === eventName
    });
    if (!emitInfo) {
      return;
    }
    const beforeAppState = Object.assign({}, this.appState);
    this.appState = Object.assign(this.appState, chagedState);
    emitInfo.handlers.forEach((handler: Handler) => {
      handler(eventName, beforeAppState, this.appState);
    });
  }

  registerHandler(eventName: string, handler: Handler): void {
    const emitInfo = this.emitInfoList.find((emitInfo: EmitInfo) => {
      return emitInfo.eventName === eventName
    });
    if (emitInfo) {
      emitInfo.handlers.push(handler);
    } else {
      this.emitInfoList.push({
        eventName: eventName,
        handlers: [handler]
      });
    }
  }

  removeHandler(eventName: string, handler: Handler): void {
    const emitInfo = this.emitInfoList.find((emitInfo: EmitInfo) => {
      return emitInfo.eventName === eventName;
    });
    if (!emitInfo) {
      return;
    }
    const handlerIndex = emitInfo.handlers.indexOf(handler);
    if (handlerIndex === -1) {
      return;
    }
    emitInfo.handlers.splice(handlerIndex, 1);
  }

}
