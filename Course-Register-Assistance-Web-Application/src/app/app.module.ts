import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { HttpService } from './http-service';
import { NotifyService } from './notify-service';
import {ServerService} from "./server-service";

import {SearchEngineComponent} from './searchEngine.component';
import {SearchListComponent} from './searchList.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchEngineComponent,
    SearchListComponent,
    SearchEngineComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    HttpService,
    NotifyService,
    ServerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
