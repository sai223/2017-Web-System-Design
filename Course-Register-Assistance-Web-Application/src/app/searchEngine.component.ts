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
  // 요일별 배열을 만들어서 시간표 중복을 검사
  Monday: boolean[] = [];
  Tuesday: boolean[] = [];
  Wednesday: boolean[] = [];
  Thursday: boolean[] = [];
  Friday: boolean[] = [];
  splitSubjectTime: string[] = [];
  ngOnInit() {
    this.selectedSubject = new Subject();
    this.searchList_T = Subjects;
    console.log(this.searchList_T);
    for (let i = 0; i < 48; i++) {
      this.Monday.push(false);
      this.Tuesday.push(false);
      this.Wednesday.push(false);
      this.Thursday.push(false);
      this.Friday.push(false);
    }
  }
  chosenSubject(subject: Subject) {
    this.selectedSubject = subject;
  }
  enroll(subject: Subject) {
    // 검사하고 넣기(부족한 검사 - 동일한 과목만 넣지 못함)
    for (let i = 0; i < this.enrollList_T.length; i++){
      if (this.enrollList_T[i] === subject) {
        alert('시간표 중복입니다.');
        return;
      }
    }
    // 철저한 검사 (시간이 겹치는 과목 넣지 못함)
    // 시작
    this.splitSubjectTime = subject.subjectTime.split(' ');
    console.log('split result is', this.splitSubjectTime);
    for (let i = 0; i < this.splitSubjectTime.length; i++) {
      console.log('first word is', this.splitSubjectTime[i].substr(0, 1));
      if (this.splitSubjectTime[i].substr(0, 1) === '월') {
      }
      else if (this.splitSubjectTime[i].substr(0, 1) === '화') {
      }
      else if (this.splitSubjectTime[i].substr(0, 1) === '수') {
      }
      else if (this.splitSubjectTime[i].substr(0, 1) === '목') {
      }
      else if (this.splitSubjectTime[i].substr(0, 1) === '금') {
      }
    }
    // 끝
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
