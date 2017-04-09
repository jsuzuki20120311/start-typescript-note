import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppStore } from '../common/AppStore';
import { AppState } from '../models/AppState';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  isProcessing: boolean;

  private htmlElement: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private elementRef: ElementRef
  ) {
    this.isProcessing = false;
    this.htmlElement = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.onChangeAppState = this.onChangeAppState.bind(this);
    AppStore.getInstance().registerHandler('CHANGE', this.onChangeAppState);
  }

  ngOnDestroy(): void {
    AppStore.getInstance().removeHandler('CHANGE', this.onChangeAppState);
  }

  private onChangeAppState(eventName: string, beforeAppState: AppState, currentAppState: AppState) {
    this.isProcessing = currentAppState.isProcessing;
  }

}
