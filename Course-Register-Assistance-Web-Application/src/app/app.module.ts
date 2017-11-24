import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SugangLogin } from './sugangLogin.component'

import { HttpService } from './http-service';
import { NotifyService } from './notify-service';
import { ConfirmService } from './confirm-service';

import {SearchEngineComponent} from './searchEngine.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchEngineComponent,
    SugangLogin
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    HttpService,
    NotifyService,
    ConfirmService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
