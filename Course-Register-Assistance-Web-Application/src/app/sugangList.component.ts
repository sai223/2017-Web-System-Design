import {Input, Component, ElementRef, AfterViewInit,
  Output, EventEmitter, OnInit} from '@angular/core';

import {Sugang} from './Sugang';
import {HttpService} from './http-service';

import 'assets/javascript/copyToClipboardService.js';
declare var copyServiceObject: any;

import 'assets/javascript/serverTimeService.js';
declare var serverTimeServiceObject: any;

@Component({
  selector: 'app-suganglist',
  templateUrl: './sugangList.component.html',
  styleUrls: ['./sugangList.component.css']
})

export class SugangListComponent implements AfterViewInit, OnInit {
  @Input() sugangList: Sugang[];
  @Output() updateSugangList = new EventEmitter();
  constructor(
    private elementRef: ElementRef,
    private httpService: HttpService
  ) {}
  currentSugangName: string;
  currentSugangNumber: string;
  ngAfterViewInit() {
    var v = document.createElement('script');
    v.type = 'text/javascript';
    v.src = 'assets/javascript/copyToClipboardService.js';
    this.elementRef.nativeElement.appendChild(v);

    var v2 = document.createElement('script');
    v2.type = 'text/javascript';
    v2.src = 'assets/javascript/serverTimeService.js';
    this.elementRef.nativeElement.appendChild(v2);
  }
  copyClick(no: number) {
    copyServiceObject.copyFunc(no);
  }
  addSugang() {
    this.httpService.addSubject(true, this.currentSugangName, this.currentSugangNumber).subscribe(result => {
      if (result == true) {
        // app.component에 보낸다. 그러면 app.component에서 getAllSubject해서 업데이트 함.
        this.currentSugangName = '';
        this.currentSugangNumber = '';
        this.updateSugangList.emit();
      }else {
        // 안보내고, 오류 메세지 띄운다.
        this.currentSugangNumber = '';
        alert('과목 번호는 올바른 값을 입력해야 합니다.');
      }
    });
  }
  deleteSugang(no: string) {
    this.httpService.deleteSubject(no).subscribe(result => {
      this.updateSugangList.emit();
    });
  }
  hour: number;
  min: number;
  sec: number;
  myInterval: any = setInterval(function(){}, 0);
  ngOnInit() {
    console.log('수강리스트 엔지온이닛');
    this.httpService.getTime().subscribe(result => {
      this.hour = result['hour'];
      this.min = result['min'];
      this.sec = result['sec'];
    });
    clearInterval(this.myInterval);
    this.myInterval = setInterval(function(){
      if (this.sec === 59) {
        if (this.min === 59) {
          if (this.hour === 23) {
            this.hour = 0;
            this.min = 0;
            this.sec = 0;
          }else {
            this.hour++;
            this.min = 0;
            this.sec = 0;
          }
        }else {
          this.min++;
          this.sec = 0;
        }
      }else {
        this.sec++;
      }
    }, 1000);
  }
  startServerTime() {
    const t = new Date(serverTimeServiceObject.getServerTime());
    this.httpService.setTime(t.getHours(), t.getMinutes(), t.getSeconds());
  }
  alarmOn10sec() {
    setTimeout(function(){
      alert('2초 지났습니다.');
    }, 2000);
  }
  alarmOn30sec() {
    setTimeout(function(){
      alert('3초 지났습니다.');
    }, 3000);
  }
  alarmOn1min() {
    setTimeout(function(){
      alert('5초 지났습니다.');
    }, 5000);
  }
}// end of class SugangListComponent
