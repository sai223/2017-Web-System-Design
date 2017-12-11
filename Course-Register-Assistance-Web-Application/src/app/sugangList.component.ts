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
      time.setMilliseconds(time.getMilliseconds() - 700);
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
    this.httpService.addSubject(true, this.currentSugangName, this.currentSugangNumber).subscribe(result => {
      if (result['msg'] == 'success') {
        // app.component에 보낸다. 그러면 app.component에서 getAllSubject해서 업데이트 함.
        this.currentSugangName = '';
        this.currentSugangNumber = '';
        this.updateSugangList.emit();
      }else if (result['msg'] == 'wrong') {
        // 안보내고, 오류 메세지 띄운다.
        this.currentSugangNumber = '';
        alert('과목 번호는 올바른 값을 입력해야 합니다.');
      }else if (result['msg'] == 'duplicate') {
        this.currentSugangNumber = '';
        alert('시간 중복입니다.');
      }
    });
    this.orderSelectedSugang = -100;
  }
  deleteSugang(no: string) {
    this.httpService.deleteSubject(no).subscribe(result => {
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
