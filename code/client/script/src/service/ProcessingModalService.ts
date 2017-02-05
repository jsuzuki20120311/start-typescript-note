import { Injectable } from '@angular/core';
import { AppStore } from "../common/AppStore";

@Injectable()
export class ProcessingModalService {

  setProcessingFlag(isProcessing: boolean): void {
    AppStore.getInstance().applyAppState('CHANGE', {
      isProcessing: isProcessing
    });
  }

}
