import {Input, Component, ElementRef, AfterViewInit,
  Output, EventEmitter, OnInit} from '@angular/core';

import {Sugang} from './Sugang';
import {HttpService} from './http-service';

// 클립보드 복사 기능은 javascript 코드로 구현했고, import해서 가져다 쓴다.
import 'assets/javascript/copyToClipboardService.js';
declare var copyServiceObject: any;

@Component({
  selector: 'app-suganglist',
  templateUrl: './sugangList.component.html',
  styleUrls: ['./sugangList.component.css']
})

export class SugangListComponent implements AfterViewInit, OnInit {
  @Input() sugangList: Sugang[];
  @Output() updateSugangList = new EventEmitter(); // 수강리스트 업데이트 하라는 신호. app 컴포넌트로 보낸다.
  @Output() orderUp = new EventEmitter(); // 리스트 순서를 위로 바꾸라는 신호. app 컴포넌트로 보낸다.
  @Output() orderDown = new EventEmitter(); // 리스트 순서를 아래로 바꾸라는 신호. app 컴포넌트로 보낸다.
  constructor(
    private elementRef: ElementRef, // template의 dom에 접근하기 위해 필요한 값.
    private httpService: HttpService
  ) {}
  currentSugangName: string; // 리스트를 추가할 때 사용자가 입력하는 과목명 값.
  currentSugangNumber: string; //  리스트를 추가할 때 사용자가 입력하는 과목번호 값.

  currentTime: string; // 현재 시각을 띄우기 위한 값. 템플릿이 바인딩하고 있다.
  currentHour: number;
  currentMin: number;
  currentSec: number;
  pad(n, width) {
    /*
    * 현재 시각을 표시할 때 두자릿수에 맞춰주기 위해 필요한 함수.
    * */
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
  }
  ngOnInit() {
    let time;
    setInterval(() => {
      // 1초마다 현재 시각을 가져와서 currentTime을 업데이트 한다.
      time = new Date();
      this.currentHour = time.getHours();
      this.currentMin = time.getMinutes();
      this.currentSec = time.getSeconds();
      this.currentTime = this.currentHour + ':' + this.pad(this.currentMin,2) + ':' + this.pad(this.currentSec,2);
    }, 1000);
  }
  ngAfterViewInit() {
    // view을 초기화할 때 javascript 코드를 첨부한다.
    var v = document.createElement('script');
    v.type = 'text/javascript';
    v.src = 'assets/javascript/copyToClipboardService.js';
    this.elementRef.nativeElement.appendChild(v);
  }
  copyClick(no: number) {
    // 리스트의 복사 버튼을 눌렀을 때 실행되는 함수.
    copyServiceObject.copyFunc(no);
  }
  addSugang() {
    // 과목명과 과목번호를 입력한 후 추가버튼을 눌렀을 때 실행되는 함수.
    if (this.currentSugangName !== '' && this.currentSugangNumber !== '') {
      this.httpService.addSubject(true, this.currentSugangName, this.currentSugangNumber).subscribe(result => {
        if (result['msg'] == 'success') {  // 추가에 성공했을 경우
          this.currentSugangName = '';
          this.currentSugangNumber = '';
          this.updateSugangList.emit(); // app 컴포넌트에 수강리스트 업데이트 신호를 보낸다.
        }else if (result['msg'] == 'wrong') { // 과목 번호가 존재하지 않을 경우
          // 안보내고, 오류 메세지 띄운다.
          this.currentSugangNumber = '';
          alert('과목 번호는 올바른 값을 입력해야 합니다.');
        }else if (result['msg'] == 'duplicate') { // 추가한 과목의 시간이, 기존에 추가했던 과목과 중복될 경우.
          this.currentSugangNumber = '';
          alert('시간 중복입니다.');
        }
      });
    }
  }
  deleteSugang(no: string) {
    // 수강리스트의 항목의 삭제 버튼을 눌렀을 때 실행되는 함수.
    this.httpService.deleteSubject_F(no).subscribe(result => {
      this.updateSugangList.emit(); // app 컴포넌트에 수강리스트 업데이트 신호를 보낸다.
    });
  }
  alarmHour: number; // 알람 시각 설정할 때 사용자가 입력하는 '시' 값
  alarmMin: number; // 알람 시각 설정할 때 사용자가 입력하는 '분' 값
  alarmSec: number; // 알람 시각 설정할 때 사용자가 입력하는 '초' 값
  currentTotalSec: number; // 알람 설정하기 위해 현재 시각을 초단위로 변환하기 위한 값.
  alarmTotalSec: number; // 알람 설정하기 위해 알람 설정 시각을 초단위로 변환하기 위한 값.
  alarmTimer: any; // 알람 설정에서 사용되는 setTimeout을 저장하기 위한 값. 하나뿐이므로, 알람 설정을 여러번 하면 덮어씌워진다.
  alarmOn() {
    if ((this.alarmHour < 0 || this.alarmHour > 24) ||
      (this.alarmMin < 0 || this.alarmMin > 60) ||
      (this.alarmSec < 0 || this.alarmSec > 60)) {
      alert('올바른 시간값을 입력하세요.');
      this.alarmHour = 0;
      this.alarmMin = 0;
      this.alarmSec = 0;
    }else {
      this.currentTotalSec = (this.currentHour * 3600) + (this.currentMin * 60) + (this.currentSec * 1);
      this.alarmTotalSec = (this.alarmHour * 3600) + (this.alarmMin * 60) + (this.alarmSec * 1);
      if ((this.alarmTotalSec - this.currentTotalSec) < 0) {
        alert('미래 시간값을 입력하세요.');
      }else {
        clearTimeout(this.alarmTimer); // 재설정하면 이전에 설정한 알람 시각은 덮어씌워진다.
        this.alarmTimer = setTimeout(function(){
          alert('알람 설정 시간이 지났습니다.');
        }, (this.alarmTotalSec - this.currentTotalSec) * 1000);
      }
    }
  }
  orderSelectedSugang: number; // 수강 리스트에서 순서를 바꾸려고 클릭한 항목의 index값.
  setOrderSelectedSugang(no: number) {
    this.orderSelectedSugang = no;
  }
  orderChange(flag: boolean) {
    // 순서 바꾸기 화살표를 누르면 실행되는 함수. app 컴포넌트로 신호를 보낸다.
    if (flag === true) {
      if (this.orderSelectedSugang !== 0) {
        this.orderUp.emit(this.orderSelectedSugang);
        this.orderSelectedSugang--;
      }
    }else {
      if (this.orderSelectedSugang !== (this.sugangList.length - 1)) {
        this.orderDown.emit(this.orderSelectedSugang);
        this.orderSelectedSugang++;
      }
    }
  }
}// end of class SugangListComponent
