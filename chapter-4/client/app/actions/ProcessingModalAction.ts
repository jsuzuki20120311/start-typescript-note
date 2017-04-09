import { AppStore } from "../common/AppStore";

export class ProcessingModalAction {

  static setProcessingFlag(isProcessing: boolean): void {
    AppStore.getInstance().applyAppState('CHANGE', {
      isProcessing: isProcessing
    });
  }

}
