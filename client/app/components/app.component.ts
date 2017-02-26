import * as $ from 'jquery';
import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppStore } from '../common/AppStore';
import { AppState } from '../models/AppState';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private htmlElement: HTMLElement;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private elementRef: ElementRef
  ) {
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
    const modalState = currentAppState.isProcessing ? 'show' : 'hide';
    $(this.htmlElement).find('.sample-app-modal').modal(modalState);
  }

}
