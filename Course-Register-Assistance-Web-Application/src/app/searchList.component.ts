import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Subject} from './Subject';

@Component({
  selector: 'app-list',
  templateUrl: './searchList.component.html',
  styleUrls: ['./searchList.component.css']
})

export class SearchListComponent implements OnInit {
  constructor() {
  }
  @Input() searchList: Subject[] = [];
  ngOnInit() {
    console.log(this.searchList);
  }
}
