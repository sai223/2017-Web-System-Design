import {Input, Component, ElementRef, AfterViewInit,
        Output, EventEmitter} from '@angular/core';

import {Sugang} from './Sugang';
import {HttpService} from './http-service';
import 'assets/javascript/copyToClipboardService.js';

declare var copyServiceObject: any;

@Component({
  selector: 'app-suganglist',
  templateUrl: './sugangList.component.html',
  styleUrls: ['./sugangList.component.css']
})

export class SugangListComponent implements AfterViewInit {
  @Input() sugangList: Sugang[];
  @Output() updateSugangList = new EventEmitter();
  constructor(
    private elementRef: ElementRef,
    private httpService: HttpService
  ) {}
  currentSugangName: string;
  currentSugangNumber: string;
  ngAfterViewInit() {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'assets/javascript/copyToClipboardService.js';
    this.elementRef.nativeElement.appendChild(s);
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
      this.updateSugangList.emit('update');
    }else {
      // 안보내고, 오류 메세지 띄운다.
      this.currentSugangNumber = '';
      alert('과목 번호는 올바른 값을 입력해야 합니다.');
    }
  });
}
deleteSugang(no: string) {
  this.httpService.deleteSubject(no).subscribe(result => {
    this.updateSugangList.emit('update');
  });
}
}
