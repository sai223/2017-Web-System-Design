import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {Subject} from './Subject';
import {Subjects} from './mock.subjectList';
import { HttpService} from './http-service';
import {TableItem} from './tableItem';

@Component({
  selector: 'app-engine',
  templateUrl: './searchEngine.component.html',
  styleUrls: ['./searchEngine.component.css']
})

export class SearchEngineComponent implements OnInit {
  searchList_T: Subject[] = []; // 수강과목 조회 리스트
  tempList: Subject[] = [];
  selectedSubject: Subject; // 수강과목 조회 리스트에서 선택한 과목
  @Input() enrollList_T: Subject[] = []; // 수강신청항목 리스트(from app.component)
  @Input() numberingArray: boolean[] = []; // 아래의 subjectNumbering 을 결정하기 위한 배열
  subjectNumbering: number; // 1~8 까지 부여되는 숫자 (요일 배열에 입력됨)

  // 요일별 배열을 만들어서 시간표 중복을 검사 (from app.component)
  @Input() Monday: TableItem[] = [];
  @Input() Tuesday: TableItem[] = [];
  @Input() Wednesday: TableItem[] = [];
  @Input() Thursday: TableItem[] = [];
  @Input() Friday: TableItem[] = [];

  splitSubjectTime: string[] = []; // 요일과 교시가 결합되어 있는 형태로 저장 ex) [0]:월C [1]:수C

  // html 과 2-way binding (ngModel)
  subjectType_2B: string; // 교과구분
  major_2B: string; // 전공
  day_2B: string; // 요일
  time_2B: string; // 강의교시
  professorName_2B: string; // 과목명
  subjectName_2B: string; // 교수명

  @Output() reflectEnrollListEvent: EventEmitter<Subject[]> = new EventEmitter();
  @Output() updateSugangList = new EventEmitter();

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
    // 1부터 8까지 차례로 부여하기 때문에 1부터 부여
    this.subjectNumbering = 1;
    this.selectedSubject = new Subject();
  }

  // 조회버튼을 누르면 실행되는 메소드
  // 조회항목(교과구분. 전공, 요일 ..등등)에 대한 내용 서버한테 전달하여
  // 해당 정보에 맞는 수강과목 조회리스트를 받아온다.
  search() {
    this.httpService.searchSubject(this.subjectType_2B, this.major_2B, this.day_2B,
      this.time_2B, this.subjectName_2B, this.professorName_2B)
      .subscribe(searchSubject => {
        this.tempList = [];
        for (let i = 0; i < Object.keys(searchSubject).length; i++) {
          this.tempList.push(searchSubject[i]);
        }
        this.searchList_T = this.tempList;
      });
  }

  // 수강신청항목에 추가하려고 하는 과목이 기존에 수강신청항목에 있던 과목들과 시간이 겹치는지 검사.
  // 중복이 없으면 true 반환
  // 중복이 있으면 false 반환 (나중에 enroll 함수에서 반환 값 사용)
  checkByDay(day: TableItem[], splitSubjectTime: string): boolean { // ex) day: Monday , splitSubjectTime : 월C
    const res = Number(splitSubjectTime.substr(1, 1)); // res : C
    if (isNaN(res)) { // 영문교시이면 ex) C(교시)
      const AlphaTime = splitSubjectTime.charCodeAt(1);
      for (let j = 6 * (AlphaTime - 65) ; j < 6 * (AlphaTime - 65) + 5; j++) {
        // 요일 배열의 각 원소에 대해서 numbering 을 확인
        // day[j].numbering = 0 이면 해당 요일의 해당 교시가 비어 있는 것
        // day[j].numbering != 0 이면 해당 요일의 해당 교시가 비어 있지 않은 것
        if (day[j].numbering !== 0) {
          alert('시간표 중복입니다');
          return false;
        }
      }
      return true;
    }
    else { // 숫자교시이면 ex) 1교시 2교시
      for (let j = 4 * (res - 1); j < 4 * (res - 1) + 4; j++) {
        if (day[j].numbering !== 0) {
          alert('시간표 중복입니다');
          return false;
        }
      }
      return true;
    }
  }
  // 기능 : 중복 검사를 마친 후에 시간표 상의 각 요일에 수강과목을 등록하기
  // 중복 검사를 마친 후에 수강과목의 시간을 요일 배열에 등록하기
  // 요일 배열 수정하기 (각 요일 배열에 넘버링값(subjectNumbering) 넣기)
  // ex) 수A 이면 0 1 2 3 4 (A 교시에 해당하는 index) 에 동일한 넘버링값(subjectNumbering) 넣기
  // ex) day[j].numbering (0  -> subjectNumbering 값)
  fillDayArray(day: TableItem[], splitSubjectTime: string, subject: Subject) {
    const res = Number(splitSubjectTime.substr(1, 1));
    if (isNaN(res)) { // 영문교시이면 ex) C(교시)
      const AlphaTime = splitSubjectTime.charCodeAt(1);
      console.log('time is ', AlphaTime);
      for (let j = 6 * (AlphaTime - 65); j < 6 * (AlphaTime - 65) + 5; j++) {
        day[j].numbering = this.subjectNumbering;
        if (j === 6 * (AlphaTime - 65)){
          day[j].itemName = subject.subjectName;
        }
      }
    }
    else { // 숫자교시이면 ex) 1교시 2교시
      for (let j = 4 * (res - 1); j < 4 * (res - 1) + 4; j++) {
        day[j].numbering = this.subjectNumbering;
        if (j === 4 * (res - 1)) {
          day[j].itemName = subject.subjectName;
        }
      }
    }
  }

  // 기능 : 중복 검사를 마친 후에 시간표 상의 모든 요일에 수강과목을 등록하기
  fillDayArrayALL(subject: Subject) {
    this.splitSubjectTime = subject.subjectTime.split(' ');
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
  }

  // 기능 : 시간표 상에서 삭제하고 싶은 수강과목을 삭제하기
  // 요일 배열 수정하기 (day[j].numbering -> 0 , day[j].name 입력)
  deleteDayArray(day: TableItem[], splitSubjectTime: string) {
    const res = Number(splitSubjectTime.substr(1, 1)); // A만 받아서
    if (isNaN(res)) { // 영문교시이면 ex) C(교시)
      const AlphaTime = splitSubjectTime.charCodeAt(1);
      for (let j = 6 * (AlphaTime - 65); j < 6 * (AlphaTime - 65) + 5; j++) {
        this.numberingArray[day[j].numbering - 1] = false;
        day[j].numbering = 0;
        day[j].itemName = '';
      }
    }
    else { // 숫자교시이면 ex) 1교시 2교시
      for (let j = 4 * (res - 1); j < 4 * (res - 1) + 4; j++) {
        this.numberingArray[day[j].numbering - 1] = false;
        day[j].numbering = 0;
        day[j].itemName = '';
      }
    }
  }

  // 수강 신청 목록에 있는 수강항목을 클릭하면 실행 (searchList.component 에서 발생시킨 이벤트가 일어나면 실행)
  chosenSubject(subject: Subject) {
    this.selectedSubject = subject;
  }

  // 등록버튼을 누르면 실행
  // 순서 : 중복검사 후 수강신청항목과 시간표상에 등록
  // 기능1 : 사용자가 등록하고자 하는 과목의 시간이 기존에 수강신청항목에 등록되어 있는 과목들과 중복되지 않는지 검사
  // 기능2 : 사용자가 등록한 과목이 수강신청항목상에 표시됨
  // 기능3 : 시간표 상에 사용자가 등록한 과목이 표시됨
  // 기능3 ex)  수C 과목을 등록하면 this.Wednesday 배열(boolean 배열)의 12 13 14 15 16 인덱스의 값을 subjectNumbering 값으로 바꾼다.
  enroll(subject: Subject) {
    // 철저한 검사 (시간이 겹치는 과목 넣지 못함)
    // 검사 및 요일 배열 수정 시작
    this.splitSubjectTime = subject.subjectTime.split(' ');
    console.log('split result is', this.splitSubjectTime);
    // 기능1 : 사용자가 등록하고자 하는 과목의 시간이 기존에 수강신청항목에 등록되어 있는 과목들과 중복되지 않는지 검사
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
    // Question : subjectNumbering 부여 하는 이유
    // Answer: 시간표 상 다른 과목에 대해 다른 색을 부여하기 위한 과정
    for (let k = 0; k < 8; k++) {
      // true : 사용중  false : 사용 안하는 중
      if (this.numberingArray[k] === false) {
        this.numberingArray[k] = true;
        this.subjectNumbering = k + 1;
        break;
      }
    }
    this.fillDayArrayALL(subject);
    // 기능2 : 사용자가 등록한 과목이 수강신청항목상에 표시됨
    this.enrollList_T.push(subject);
    // app.component 배열에 반영시키기 위한 이벤트 발생
    this.reflectEnrollListEvent.emit(this.enrollList_T);
    // 디비에 반영
    this.addSubjectToDB(subject);
    this.updateDayArray(this.Monday, this.Tuesday, this.Wednesday, this.Thursday, this.Friday, this.numberingArray);
  }
  // 기능 : 수강신청항목에서 선택한 수강과목 지우기
  // 요일 배열의 값 초기화.(subjectNumbering 값 -> 0)
  // ex) 수C 과목 삭제 >> this.Wednesday(Boolean 배열)의 12 13 14 15 16번 인덱스가 subjectNumbering 값 -> 0 으로 변한다.
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
        // 이벤트를 발생 -> app.component 배열에 반영
        this.reflectEnrollListEvent.emit(this.enrollList_T);
        // DB에 반영
        this.deleteSubjectToDB(subject.subjectNumber);
        this.updateDayArray(this.Monday, this.Tuesday, this.Wednesday, this.Thursday, this.Friday, this.numberingArray);
      }
    }
  }
  // DB 에 수강과목 저장
  addSubjectToDB(subject: Subject) {
    this.httpService.addSubject(false, subject.subjectName, subject.subjectNumber).subscribe(result => {
      this.updateSugangList.emit();
    });
  }
  // DB 에 수강과목 삭제
  deleteSubjectToDB(subjectNumber: string) { // no 가 뭐지?
    this.httpService.deleteSubject(subjectNumber).subscribe(result => {
      this.updateSugangList.emit();
    });
  }
  // DB에 시간표를 구성하는 요일 배열 저장
  updateDayArray(Monday_R: TableItem[], Tuesday_R: TableItem[], Wednesday_R: TableItem[], Thursday_R: TableItem[], Friday_R: TableItem[], numberingArray: boolean[]) {
    this.httpService.updateArray(Monday_R, Tuesday_R, Wednesday_R, Thursday_R, Friday_R, numberingArray).subscribe(result => {
    });
  }

}
