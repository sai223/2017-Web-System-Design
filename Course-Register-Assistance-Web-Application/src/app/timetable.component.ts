import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Subject} from './Subject';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})

export class TimetableComponent {
  @Input() enrollList_R: Subject[] = [];
  @Output() deleteSubjectEvent: EventEmitter<Subject> = new EventEmitter();
  deleteSubject(subject: Subject) {
    this.deleteSubjectEvent.emit(subject);
  }
}
