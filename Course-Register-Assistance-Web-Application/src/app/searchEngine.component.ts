import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {Subject} from './Subject';
import {Subjects} from './mock.subjectList';
import { HttpService} from './http-service';
import 'rxjs/add/operator/map';
import {TableItem} from './tableItem';

@Component({
  selector: 'app-engine',
  templateUrl: './searchEngine.component.html',
  styleUrls: ['./searchEngine.component.css']
})

export class SearchEngineComponent implements OnInit {
  searchList_T: Subject[] = [];
  selectedSubject: Subject;
  @Input() enrollList_T: Subject[] = [];
  numberingArray: boolean[] = [];
  subjectNumbering: number;
  // 요일별 배열을 만들어서 시간표 중복을 검사
  Monday: TableItem[] = [];
  Tuesday: TableItem[] = [];
  Wednesday: TableItem[] = [];
  Thursday: TableItem[] = [];
  Friday: TableItem[] = [];
  // 월C 금C 같이 요일과교시가 결합되어 있는 형태로 저장
  splitSubjectTime: string[] = [];
  // html 과 2-way binding (ngModel)
  subjectType_2B: string; // 교과구분
  major_2B: string; // 전공
  day_2B: string; // 요일
  time_2B: string; // 강의교시
  professorName_2B: string; // 과목명
  subjectName_2B: string; // 교수명
  initItem: TableItem;
  @Output() reflectEnrollListEvent: EventEmitter<Subject[]> = new EventEmitter();
  @Output() updateSugangList = new EventEmitter();
  constructor(private httpService: HttpService) {
  }
  ngOnInit() {
    // 과목 등록할 때 그 과목에 대해 부여하는 숫자
    // 요일 배열을 채울 때 사용
    this.subjectNumbering = 1;
    this.selectedSubject = new Subject();
    // 조회버튼을 누를 때 서버에 전송되는 Subject 객체
    this.searchList_T = Subjects;
    console.log(this.searchList_T);
    // 각 요일 배열이 48칸인 이유
    // 한 칸당 15분(쉬는 시간 고려)
    // 아침 9시부터(A교시) 저녁 9시(H교시)까지 생각
    // 15(1칸) * 4(1시간) * 12(9am ~ 9pm) = 1칸 짜리 48개 필요 즉, 48칸
    for (let i = 0; i < 48; i++) {
      this.Monday.push({numbering: 0, isFirst: false, itemName: ''});
      this.Tuesday.push({numbering: 0, isFirst: false, itemName: ''});
      this.Wednesday.push({numbering: 0, isFirst: false, itemName: ''});
      this.Thursday.push({numbering: 0, isFirst: false, itemName: ''});
      this.Friday.push({numbering: 0, isFirst: false, itemName: ''});
    }
    // 넘버링숫자를 1~8 까지만 주기 위함
    for (let n = 0; n < 8; n++) {
      this.numberingArray.push(false);
    }
  }
  // 조회버튼을 누르면 실행되는 메소드
  // 아직 html 상에 넣지 않음
  // httpService import 안되는 거 해결해야함
  search() {
    console.log(this.subjectType_2B, this.major_2B, this.day_2B,
      this.time_2B, this.subjectName_2B, this.professorName_2B);
    this.httpService.searchSubject(this.subjectType_2B, this.major_2B, this.day_2B,
      this.time_2B, this.subjectName_2B, this.professorName_2B).map(this.parseSubject)
      .subscribe(searchSubject => {
          console.log(searchSubject, 'is upload!');
          // this.searchList_T = searchSubject;
      });
  }
  parseSubject(res: Response) {
    return res['searchSubject'];
  }
  // 수강신청항목에 추가하려고 하는 과목이 기존에 수강신청항목에 있던 과목들과 겹치는지 검사만 한다.
  // 중복이 없으면 true 를 반환하고
  // 중복이 있으면 false 를 반환한다. (나중에 enroll 함수에서 return 하기 위함)
  checkByDay(day: TableItem[], splitSubjectTime: string): boolean {
    const res = Number(splitSubjectTime.substr(1, 1));
    if (isNaN(res)) { // A 교시와 같이 영문교시이면 - AlphaTime
      const AlphaTime = splitSubjectTime.charCodeAt(1);
      for (let j = 6 * (AlphaTime - 65) ; j < 6 * (AlphaTime - 65) + 5; j++) {
        if (day[j].numbering !== 0) {
          alert('시간표 중복입니다');
          return false;
        }
      }
      return true;
    } else { // 1교시와 같이 숫자교시이면
      for (let j = 4 * (res - 1); j < 4 * (res - 1) + 4; j++) {
        if (day[j].numbering !== 0) {
          alert('시간표 중복입니다');
          return false;
        }
      }
      return true;
    }
  }
  // 등록할 때
  // 요일 배열 수정하기 (0 -> subjectNumbering 값)
  fillDayArray(day: TableItem[], splitSubjectTime: string, subject: Subject) {
    const res = Number(splitSubjectTime.substr(1, 1));
    if (isNaN(res)) { // A 교시와 같이 영문교시이면 - AlphaTime
      const AlphaTime = splitSubjectTime.charCodeAt(1);
      console.log('time is ', AlphaTime);
      for (let j = 6 * (AlphaTime - 65); j < 6 * (AlphaTime - 65) + 5; j++) {
        day[j].numbering = this.subjectNumbering;
        if (j === 6 * (AlphaTime - 65)){
          day[j].itemName = subject.subjectName;
        }
      }
    }
    else { // 1교시와 같이 숫자교시이면
      for (let j = 4 * (res - 1); j < 4 * (res - 1) + 4; j++) {
        day[j].numbering = this.subjectNumbering;
        if (j === 4 * (res - 1)) {
          day[j].itemName = subject.subjectName;
        }
      }
    }
  }
  // 삭제할 때
  // 요일 배열 수정하기 (넘버링 -> 0)
  // 월A 이렇게 넘겨주면 (splitSubjectTime: string)
  deleteDayArray(day: TableItem[], splitSubjectTime: string) {
    const res = Number(splitSubjectTime.substr(1, 1)); // A만 받아서
    if (isNaN(res)) { // A 교시와 같이 영문교시이면 - AlphaTime
      const AlphaTime = splitSubjectTime.charCodeAt(1);
      for (let j = 6 * (AlphaTime - 65); j < 6 * (AlphaTime - 65) + 5; j++) {
        this.numberingArray[day[j].numbering - 1] = false;
        day[j].numbering = 0;
        day[j].itemName = '';
      }
    }
    else { // 1교시와 같이 숫자교시이면
      for (let j = 4 * (res - 1); j < 4 * (res - 1) + 4; j++) {
        this.numberingArray[day[j].numbering - 1] = false;
        day[j].numbering = 0;
        day[j].itemName = '';
      }
    }
  }
  // 수강 신청 목록에 있는 수강항목을 클릭하면 실행
  // (searchList.component 에서 발생시킨 이벤트가 일어나면 실행되는 메소드)
  chosenSubject(subject: Subject) {
    this.selectedSubject = subject;
  }
  // 등록버튼을 누르면 실행되는 메소드
  // 유저가 선택한 과목이 수강신청항목으로 들어오게 된다.
  // 그리고 각 요일 배열의 값들을 수정한다.
  // 예를 들어 수C 과목을 등록하면 this.Wednesday 배열(boolean 배열)의 12 13 14 15 16 인덱스의 값을 subjectNumbering 값으로 바꾼다.
  // 중요 -> 검사를 먼저하고 중복된 게 없으면 요일 배열의 값을 수정(false -> subjectNumbering)한다.
  enroll(subject: Subject) {
    // 철저한 검사 (시간이 겹치는 과목 넣지 못함)
    // 검사 및 요일 배열 수정 시작
    this.splitSubjectTime = subject.subjectTime.split(' ');
    console.log('split result is', this.splitSubjectTime);
    // 검사 시작
    for (let i = 0; i < this.splitSubjectTime.length; i++) {
      console.log('first word is', this.splitSubjectTime[i].substr(0, 1));
      if (this.splitSubjectTime[i].substr(0, 1) === '월') {
        const check = this.checkByDay(this.Monday, this.splitSubjectTime[i]);
        if (check === false) {return; } // false 를 반환하면 중복이라는 뜻
      }
      else if (this.splitSubjectTime[i].substr(0, 1) === '화') {
        const check = this.checkByDay(this.Tuesday, this.splitSubjectTime[i]);
        if (check === false) {return; } // false 를 반환하면 중복이라는 뜻
      }
      else if (this.splitSubjectTime[i].substr(0, 1) === '수') {
        const check = this.checkByDay(this.Wednesday, this.splitSubjectTime[i]);
        if (check === false) {return; }
      }
      else if (this.splitSubjectTime[i].substr(0, 1) === '목') {
        const check = this.checkByDay(this.Thursday, this.splitSubjectTime[i]);
        if (check === false) {return; }
      }
      else if (this.splitSubjectTime[i].substr(0, 1) === '금') {
        const check = this.checkByDay(this.Friday, this.splitSubjectTime[i]);
        if (check === false) {return; }
      }
    }
    for (let k = 0; k < 8; k++) {
      // false 가 시간표상  비어있는 곳
      // true : 사용중  false : 사용 안하는 중
      if (this.numberingArray[k] === false) {
        this.numberingArray[k] = true;
        this.subjectNumbering = k + 1;
        break;
      }
    }
    console.log('요일 배열 채우기 전 시점', this.Monday, this.Tuesday, this.Wednesday, this.Thursday, this.Friday);
    debugger;
    // 검사끝
    // console.log('검사 끝난 시점', this.Wednesday);
    // 요일 배열 수정(각 요일 배열에 넘버링값 넣기) 시작
    // 수A 이면 0 1 2 3 4 에 동일한 넘버링값 넣기
    for (let i = 0; i < this.splitSubjectTime.length; i++) {
      if (this.splitSubjectTime[i].substr(0, 1) === '월') {
        this.fillDayArray(this.Monday, this.splitSubjectTime[i], subject);
      }
      else if (this.splitSubjectTime[i].substr(0, 1) === '화') {
        this.fillDayArray(this.Tuesday, this.splitSubjectTime[i], subject);
      }
      else if (this.splitSubjectTime[i].substr(0, 1) === '수') {
        this.fillDayArray(this.Wednesday, this.splitSubjectTime[i], subject);
      }
      else if (this.splitSubjectTime[i].substr(0, 1) === '목') {
        this.fillDayArray(this.Thursday, this.splitSubjectTime[i], subject);
      }
      else if (this.splitSubjectTime[i].substr(0, 1) === '금') {
        this.fillDayArray(this.Friday, this.splitSubjectTime[i], subject);
      }
    }
    // 요일 배열 수정 끝
    console.log('요일 배열 만들기 끝난 시점', this.Monday, this.Tuesday, this.Wednesday, this.Thursday, this.Friday);
    debugger;
    // 리스트에 등록하기 시작
    this.enrollList_T.push(subject);
    // 리스트에 등록하기 끝
    // 이벤트를 발생 -> app.component 배열에 반영시키고
    this.reflectEnrollListEvent.emit(this.enrollList_T);
    // 디비에 반영시킨다.
    //this.addSubjectToDB(subject);
  }
  // 삭제할 과목을 수강신청항목에서 지우고
  // 요일 배열의 값을 수정한다.(subjectNumbering 값 -> 0)
  // 예를 들어 수C 과목을 지우면 this.Wednesday(Boolean 배열)의 12 13 14 15 16번 인덱스가 subjectNumbering 값 -> 0 으로 변한다.
  deleteSubject(subject: Subject) {
    for (let i = 0; i < this.enrollList_T.length; i++) {
      if (this.enrollList_T[i] === subject) {
        this.enrollList_T.splice(i, 1);
        // 요일 배열 값 바꿔주기 true -> false
        this.splitSubjectTime = subject.subjectTime.split(' ');
        console.log('split result is', this.splitSubjectTime);
        for (let j = 0; j < this.splitSubjectTime.length; j++) {
          if (this.splitSubjectTime[j].substr(0, 1) === '월') {
            this.deleteDayArray(this.Monday, this.splitSubjectTime[j]);
          }
          else if (this.splitSubjectTime[j].substr(0, 1) === '화') {
            this.deleteDayArray(this.Tuesday, this.splitSubjectTime[j]);
          }
          else if (this.splitSubjectTime[j].substr(0, 1) === '수') {
            this.deleteDayArray(this.Wednesday, this.splitSubjectTime[j]);
          }
          else if (this.splitSubjectTime[j].substr(0, 1) === '목') {
            this.deleteDayArray(this.Thursday, this.splitSubjectTime[j]);
          }
          else if (this.splitSubjectTime[j].substr(0, 1) === '금') {
            this.deleteDayArray(this.Friday, this.splitSubjectTime[j]);
          }
        }
        // 이벤트를 발생 -> app.component 배열에 반영시키고
        this.reflectEnrollListEvent.emit(this.enrollList_T);
        // DB에 반영
        //this.deleteSubjectToDB(subject.subjectNumber);
        console.log('요일 배열 삭제 끝난 시점', this.Monday, this.Tuesday, this.Wednesday, this.Thursday, this.Friday);
      }
    }
  }
  addSubjectToDB(subject: Subject) {
    this.httpService.addSubject(false, subject.subjectName, subject.subjectNumber).subscribe(result => {
        this.updateSugangList.emit();
    });
  }
  deleteSubjectToDB(subjectNumber: string) { // no 가 뭐지?
    this.httpService.deleteSubject(subjectNumber).subscribe(result => {
      this.updateSugangList.emit();
    });
  }
}
