import {Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, EmbeddedViewRef} from '@angular/core';

import {NotifyService} from './notify-service';
import {HttpService} from './http-service';

import {Subject} from './Subject';
import {Sugang} from './Sugang';

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
  enrollList_T: Subject[] = [];
  sugangList: Sugang[] = [];
  currentPage: number; // 1: 수강신청 페이지, 2: 시간표 조회 페이지
  loginState: boolean; // true: 로그인 상태, false: 로그아웃 상태
  userID: string;
  userPassword: string;
  userName: string;
  currentTemplate: TemplateRef<any>;
  currentView: EmbeddedViewRef<any>;
  constructor(
    private vcr: ViewContainerRef,
    private notifyService: NotifyService,
    private httpService: HttpService
  ) {}
  ngOnInit() {
    this.currentPage = 1;
    this.loginState = false;
    this.createTemplate();
    // 세션 관련 코드
    this.httpService.analyzeSession().subscribe(result => {
      if (JSON.parse(JSON.stringify(result)).boolean == true) {
        console.log('세션 유지 같은 브라우저 접속자: '+ JSON.parse(JSON.stringify(result)).userName);
        this.userName = JSON.parse(JSON.stringify(result)).userName;
        this.handleSession();
      } else {
        console.log('첫접속 브라우저');
      }
    });
  }
  handleSession() {
    this.loginState = true;
    this.getAllSubject();
    this.destroyTemplate();
    this.createTemplate();
  }
  getAllSubject() {
    this.httpService.getAllSubjects().subscribe(result => {
      let no = 0;
      this.sugangList = [];
      this.enrollList_T = [];
      Object.keys(result).forEach(key => {
        this.enrollList_T.push(result[key]);
        let sugang = new Sugang(no, result[key].subjectName, result[key].subjectNumber);
        this.sugangList[no] = sugang;
        no++;
      });
    });
  }
  changeCurrentPage(no: number) {
    this.currentPage = no;
    this.destroyTemplate();
    this.createTemplate();
  }
  changeLoginState(st: boolean) {
    if (this.currentPage === 1) { // 수강신청 페이지일 경우
      if ( st === true ) { // 로그인 버튼을 눌렀을 경우
        this.httpService.logIn(this.userID, this.userPassword).subscribe(result => {
          if (result['boolean'] === true) { // 로그인 성공
            this.userPassword = '';
            this.loginState = true;
            this.userName = result['userName']; // userName 할당
            this.getAllSubject();
          }else { // 로그인 실패
            alert('계정 정보가 존재하지 않습니다.');
            this.userPassword = '';
          }
          this.destroyTemplate();
          this.createTemplate();
        });
      }else if (st === false) { // 로그아웃 버튼을 눌렀을 경우
        this.httpService.logOut().subscribe(result => {
          this.userName = '';
          this.loginState = false;
          this.enrollList_T = [];
          this.sugangList = [];
          this.destroyTemplate();
          this.createTemplate();
        });
      }
    }else if (this.currentPage === 2) { // 시간표 조회 페이지일 경우
      if (st === true) { // 로그인 버튼을 눌렀을 경우
        this.loginState = true;
        this.destroyTemplate();
        this.createTemplate();
      }else if (st === false) { // 로그아웃 버튼을 눌렀을 경우
        this.loginState = false;
        this.destroyTemplate();
        this.createTemplate();
      }
    }
  }
  destroyTemplate() {
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
  reflectEnrollList_T(enrollList: Subject[]){
    this.enrollList_T = enrollList;
  }
}
