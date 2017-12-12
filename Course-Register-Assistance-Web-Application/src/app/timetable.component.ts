import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Subject} from './Subject';
import {TableItem} from './tableItem';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})

export class TimetableComponent implements OnInit{
  // 시간표는 요일 배열 5개의 집합
  // from searchEngine.component
  @Input() Monday_R: TableItem[] = [];
  @Input() Tuesday_R: TableItem[] = [];
  @Input() Wednesday_R: TableItem[] = [];
  @Input() Thursday_R: TableItem[] = [];
  @Input() Friday_R: TableItem[] = [];
  empty: string[] = [];
  emptyString: string;
  // 수강신청항목에 등록되어 있는 각 과목들에 대해서 다른 색 부여
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
    // 시간표 좌측에 시간을 표시하기 위한 작업 (9시~20시)
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
 }
}
