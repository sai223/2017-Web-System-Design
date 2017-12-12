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
  // 수강과목 조회에 있는 과목 선택시 선택한 과목을 searchEngine.component 에 전달
  choice(subject: Subject) {
    this.selectedSubject = subject;
    this.subjectClickEvent.emit(this.selectedSubject);
  }
}
