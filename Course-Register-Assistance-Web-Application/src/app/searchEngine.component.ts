import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Subject} from './Subject';
import {Subjects} from './mock.subjectList';

@Component({
  selector: 'app-engine',
  templateUrl: './searchEngine.component.html',
  styleUrls: ['./searchEngine.component.css']
})

export class SearchEngineComponent implements OnInit {
  searchList_T: Subject[] = [];
  selectedSubject: Subject;
  enrollList_T: Subject[] = [];
  ngOnInit() {
    this.selectedSubject = new Subject();
    this.searchList_T = Subjects;
    console.log(this.searchList_T);
  }
  chosenSubject(subject: Subject) {
    this.selectedSubject = subject;
  }
  enroll(subject: Subject) {
    // 검사하고 넣기
    for (let i = 0; i < this.enrollList_T.length; i++){
      if(this.enrollList_T[i] === subject){
        alert('시간표 중복입니다.');
        return;
      }
    }
    this.enrollList_T.push(subject);
    // 검사 표 만들기
  }
  deleteSubject(subject: Subject) {
    for( let i = 0; i < this.enrollList_T.length; i++) {
      if (this.enrollList_T[i] === subject) {
        this.enrollList_T.splice(i, 1);
      }
    }
  }
}
