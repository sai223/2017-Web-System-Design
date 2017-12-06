import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Subject} from './Subject';
import {TableItem} from './tableItem';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})

export class TimetableComponent implements OnInit{
  // searchEngine 에서 가져온 수강신청항목
  @Input() Monday_R: TableItem[] = [];
  @Input() Tuesday_R: TableItem[] = [];
  @Input() Wednesday_R: TableItem[] = [];
  @Input() Thursday_R: TableItem[] = [];
  @Input() Friday_R: TableItem[] = [];
  empty: string[] = [];
  emptyString: string;
  // 시간표 css 변경 로직은 Typescript 에서 짜고
  // 적용은 [ngClass]="메소드이름()"으로 한다
  // 삭제버튼이 눌렸을 때 실행되는 메소드
  selectColor(slot: TableItem) {
    if (slot.numbering === 1) {
      return {color1: true};
    }
    if (slot.numbering === 2) {
      return {color2: true};
    }
    if (slot.numbering === 3) {
      return {color3: true};
    }
    if (slot.numbering === 4) {
      return {color4: true};
    }
    if (slot.numbering === 5) {
      return {color5: true};
    }
    if (slot.numbering === 6) {
      return {color6: true};
    }
    if (slot.numbering === 7) {
      return {color7: true};
    }
    if (slot.numbering === 8) {
      return {color8: true};
    }
   else { // slot === 0
     return {colorNo: true};
   }
  }

  ngOnInit() {
    this.emptyString = ' ';
    let time = 9;
  for (let i = 0; i < 48; i++) {
    if (i % 4 === 0) {
      this.empty.push(time.toString());
      time++;
    }
    else {
      this.empty.push(' ');
    }
  }
    console.log('this.Monday_R 길이는', this.Monday_R.length);
    console.log('this.empty 길이는', this.empty.length);
 }
}
