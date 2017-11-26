import {Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, EmbeddedViewRef} from '@angular/core';


import {NotifyService} from './notify-service';
import {HttpService} from './http-service';

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
    /*
    //세션 관련 추가
    //같은 브라우져에서 접속시 로그인되어있던 사용자 이름 불러옴 -> JSON.parse(JSON.stringify(result)).userName
    this.serverService.analyzeSession().subscribe(result =>{
      console.log(JSON.stringify(result)+'dddddddd');
      if (JSON.parse(JSON.stringify(result)).boolean == true) {
        console.log('세션유지 같은 브라우저 접속자: '+ JSON.parse(JSON.stringify(result)).userName);
        this.userName = JSON.parse(JSON.stringify(result)).userName;
      } else {
        console.log('세션 ㄴㄴ');
      }
    })
    */
  }
  changeCurrentPage(no: Number) {
    this.currentPage = no;
    this.destroyTemplate();
    this.createTemplate();
  }
  changeLoginState(st: boolean) {
    if ( st === true ) { // 로그인 버튼을 눌렀을 경우
      this.httpService.logIn(this.userID, this.userPassword).subscribe(result => {
        // result는 {userName, boolean} 형태
        if (result['boolean'] === true) { // 로그인 성공
          this.userName = result['userName']; // userName 할당
          this.notifyService.notifyOther({from: 'app.component', to: 'handle-sugangList.component', content: {
            state: 'Login',
            id: this.userID
          }});
          this.userPassword = '';
          this.loginState = true;
        }else { // 로그인 실패
          alert('계정 정보가 존재하지 않습니다.');
          this.userPassword = '';
        }
      });
    }else { // 로그아웃 버튼을 눌렀을 경우
      this.httpService.logOut(this.userID).subscribe(result => {
        this.userName = '';
        this.notifyService.notifyOther({from: 'app.component', to: 'handle-sugangList.component', content: {
          state: 'Logout',
          id: this.userID
        }});
        this.loginState = false;
      });
    }
    this.destroyTemplate();
    this.createTemplate();
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
}
