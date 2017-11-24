import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
<<<<<<< HEAD
import { SugangLogin } from './sugangLogin.component';
=======
>>>>>>> de402ab0bf67f8abab62dc264354890ff8a9f570

import { HttpService } from './http-service';
import { NotifyService } from './notify-service';

import {SearchEngineComponent} from './searchEngine.component';
import {SearchListComponent} from './searchList.component';


@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    SearchEngineComponent,
    SearchListComponent,
    SugangLogin
=======
    SearchEngineComponent
>>>>>>> de402ab0bf67f8abab62dc264354890ff8a9f570
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
