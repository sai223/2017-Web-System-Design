import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Subject} from './Subject';

@Component({
  selector: 'app-enroll',
  templateUrl: './enrollList.component.html',
  styleUrls: ['./enrollList.component.css']
})

export class EnrollListComponent {
  // searchEngine 에서 가져온 수강신청항목
  @Input() enrollList_R: Subject[] = [];
  @Output() deleteSubjectEvent: EventEmitter<Subject> = new EventEmitter();

  deleteSubject(subject: Subject) {
    this.deleteSubjectEvent.emit(subject);
  }
}
