import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Subject} from './Subject';
import {Subjects} from './mock.subjectList';

@Component({
  selector: 'app-engine',
  templateUrl: './searchEngine.component.html',
  styleUrls: ['./searchEngine.component.css']
})

export class SearchEngineComponent implements OnInit {
  searchList: Subject[] = [];
  ngOnInit() {
    this.searchList = Subjects;
    console.log(this.searchList);
  }
}
