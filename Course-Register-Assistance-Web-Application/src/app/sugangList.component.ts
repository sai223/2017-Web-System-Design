import {Input, Component, ElementRef, AfterViewInit,
  Output, EventEmitter, OnInit} from '@angular/core';

import {Sugang} from './Sugang';
import {HttpService} from './http-service';

import 'assets/javascript/copyToClipboardService.js';
declare var copyServiceObject: any;

@Component({
  selector: 'app-suganglist',
  templateUrl: './sugangList.component.html',
  styleUrls: ['./sugangList.component.css']
})

export class SugangListComponent implements AfterViewInit, OnInit {
  @Input() sugangList: Sugang[];
  @Output() updateSugangList = new EventEmitter();
  @Output() orderUp = new EventEmitter();
  @Output() orderDown = new EventEmitter();
  constructor(
    private elementRef: ElementRef,
    private httpService: HttpService
  ) {}
  currentSugangName: string;
  currentSugangNumber: string;
  currentTime: string;
  currentHour: number;
  currentMin: number;
  currentSec: number;
  pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
  }
  ngOnInit() {
    let time;
    setInterval(() => {
      time = new Date();
      this.currentHour = time.getHours();
      this.currentMin = time.getMinutes();
      this.currentSec = time.getSeconds();
      this.currentTime = this.currentHour + ':' + this.pad(this.currentMin,2) + ':' + this.pad(this.currentSec,2);
    }, 1000);
  }
  ngAfterViewInit() {
    var v = document.createElement('script');
    v.type = 'text/javascript';
    v.src = 'assets/javascript/copyToClipboardService.js';
    this.elementRef.nativeElement.appendChild(v);
  }
  copyClick(no: number) {
    copyServiceObject.copyFunc(no);
  }
  addSugang() {
    // 과목명과 과목번호를 입력한 후 추가버튼을 눌렀을 때 실행되는 함수.
    if (this.currentSugangName !== '' && this.currentSugangNumber !== '') {
      this.httpService.addSubject(true, this.currentSugangName, this.currentSugangNumber).subscribe(result => {
        if (result['msg'] === 'success') { // 추가에 성공했을 경우
          this.currentSugangName = '';
          this.currentSugangNumber = '';
          this.updateSugangList.emit(); // app 컴포넌트에 수강리스트 업데이트 신호를 보낸다.
        }else if (result['msg'] === 'wrong') { // 과목 번호가 존재하지 않을 경우
          this.currentSugangNumber = '';
          alert('과목 번호는 올바른 값을 입력해야 합니다.');
        }else if (result['msg'] === 'duplicate') { // 추가한 과목의 시간이, 기존에 추가했던 과목과 중복될 경우.
          this.currentSugangNumber = '';
          alert('시간 중복입니다.');
        }
      });
    }
  }
  deleteSugang(no: string) {
    this.httpService.deleteSubject2(no).subscribe(result => {
      this.updateSugangList.emit();
    });
  }
  alarmHour: number;
  alarmMin: number;
  alarmSec: number;
  currentTotalSec: number;
  alarmTotalSec: number;
  alarmTimer: any;
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
        clearTimeout(this.alarmTimer);
        this.alarmTimer = setTimeout(function(){
          alert('알람 설정 시간이 지났습니다.');
        }, (this.alarmTotalSec - this.currentTotalSec) * 1000);
      }
    }
  }
  orderSelectedSugang: number;
  setOrderSelectedSugang(no: number) {
    this.orderSelectedSugang = no;
  }
  orderChange(flag: boolean) {
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
