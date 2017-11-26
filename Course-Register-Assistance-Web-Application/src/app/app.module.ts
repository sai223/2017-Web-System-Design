import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { HttpService } from './http-service';
import { NotifyService } from './notify-service';

import {SearchEngineComponent} from './searchEngine.component';
import {SearchListComponent} from './searchList.component';
import {HandleSugangListComponent} from './handle-sugangList.component';
import {SugangListComponent} from './sugangList.component';
import {ServerTimeAlarmComponent} from './serverTime-Alarm.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchEngineComponent,
    SearchListComponent,
    HandleSugangListComponent,
    SugangListComponent,
    ServerTimeAlarmComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    HttpService,
    NotifyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
