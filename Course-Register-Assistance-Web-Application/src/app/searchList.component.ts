import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Subject} from './Subject';

@Component({
  selector: 'app-list',
  templateUrl: './searchList.component.html',
  styleUrls: ['./searchList.component.css']
})

export class SearchListComponent implements OnInit {
  @Input() searchList_R: Subject[] = [];
  @Output() subjectClickEvent: EventEmitter<Subject> = new EventEmitter();
  selectedSubject: Subject;
  ngOnInit() {
    console.log(this.searchList_R);
    this.selectedSubject = new Subject();
  }
  // 표를 클릭하면 selectedSubject 에 클릭한 과목 넣어
  choice(subject: Subject) {
    this.selectedSubject = subject;
    this.subjectClickEvent.emit(this.selectedSubject);
    console.log('선택된 과목은 ', this.selectedSubject, '입니다');
  }
}
