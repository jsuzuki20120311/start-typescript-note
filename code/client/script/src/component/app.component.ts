'use strict';

import * as $ from 'jquery';
import 'bootstrap';
import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {AppStore} from "../common/AppStore";
import {AppState} from "../model/AppState";

@Component({
  selector: 'app',
  template: `
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">Sample Crud Application</a>
        </div>
      </div>
    </nav>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">	
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
    
    <div class="sample-app-modal modal fade bs-example-modal-sm" id="myPleaseWait" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
      <div class="modal-dialog modal-sm">
          <div class="modal-content">
              <div class="modal-header">
                  <h4 class="modal-title">
                      <span class="glyphicon glyphicon-time">
                      </span>Please Wait
                   </h4>
              </div>
              <div class="modal-body">
                  <div class="progress">
                      <div class="progress-bar progress-bar-info
                      progress-bar-striped active"
                      style="width: 100%">
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
    
  `
})
export class AppComponent implements OnInit, OnDestroy {

  private htmlElement: HTMLElement;

  constructor(private router: Router, private elementRef: ElementRef) {
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
    if (currentAppState.isProcessing) {
      ($(this.htmlElement.querySelector('.sample-app-modal')) as any).modal('show');
    } else {
      ($(this.htmlElement.querySelector('.sample-app-modal')) as any).modal('hide');
    }
  }

}
