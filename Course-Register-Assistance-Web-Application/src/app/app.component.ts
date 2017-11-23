import {Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, EmbeddedViewRef} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('Sugang_Login') Sugang_Login: TemplateRef<any>;
  @ViewChild('Sugang_Logout') Sugang_Logout: TemplateRef<any>;
  @ViewChild('Timetable_Login') Timetable_Login: TemplateRef<any>;
  @ViewChild('Timetable_Logout') Timetable_Logout: TemplateRef<any>;
  currentPage: Number; // 1: 수강신청 페이지, 2: 시간표 조회 페이지
  loginState: Boolean; // true: 로그인 상태, false: 로그아웃 상태
  currentTemplate: TemplateRef<any>;
  currentView: EmbeddedViewRef<any>;
  constructor(
    private vcr: ViewContainerRef,
  ) {}
  ngOnInit() {
    this.currentPage = 1;
    this.loginState = false;
    this.createTemplate();
  }
  changeCurrentPage(no: Number) {
    this.currentPage = no;
    this.removeTemplate();
    this.createTemplate();
  }
  changeLoginState(st: boolean) {
    this.loginState = st;
    this.removeTemplate();
    this.createTemplate();
  }
  removeTemplate() {
    this.currentView.destroy();
  }
  createTemplate() {
    if (this.currentPage === 1) {
      if (this.loginState === true) {
        this.currentTemplate = this.Sugang_Login;
      }else {
        this.currentTemplate = this.Sugang_Logout;
      }
    }else {
      if (this.loginState === true) {
        this.currentTemplate = this.Timetable_Login;
      }else {
        this.currentTemplate = this.Timetable_Logout;
      }
    }
    this.currentView = this.vcr.createEmbeddedView(this.currentTemplate);
  }
}
