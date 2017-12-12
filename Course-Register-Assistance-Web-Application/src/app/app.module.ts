import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { HttpService } from './http-service';

import {SearchEngineComponent} from './searchEngine.component';
import {SearchListComponent} from './searchList.component';
import {SugangListComponent} from './sugangList.component';
import {TimetableComponent} from './timetable.component';
import {EnrollListComponent} from './enrollList.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchEngineComponent,
    SearchListComponent,
    SugangListComponent,
    TimetableComponent,
    EnrollListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
