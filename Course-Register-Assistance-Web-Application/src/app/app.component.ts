import {Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, EmbeddedViewRef} from '@angular/core';

import {NotifyService} from './notify-service';
import {ServerService} from './server-service';

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
    private serverService: ServerService
  ) {}
  ngOnInit() {
    this.currentPage = 1;
    this.loginState = false;
    this.createTemplate();

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
  }
  changeCurrentPage(no: Number) {
    this.currentPage = no;
    this.removeTemplate();
    this.createTemplate();
  }
  changeLoginState(st: boolean) {

    this.loginState = st;

    if ( st === true ) {
      // 아이디 비번을 입력하고 로그인 버튼을 눌러오면 서버에서 판단하여 있는 정보면 JSON.parse(JSON.stringify(result)).boolean가 True,
      // 없는 정보면 False를 불러옵니다
      // 맞는 정보면 그사람의 이름을 JSON.parse(JSON.stringify(result)).userName 로 받아옵니다.
      // 아이디나 비번이 틀렸을시 userName은 '' 이며 이는 JSON.parse(JSON.stringify(result)).boolean는 false입니다
      this.serverService.searchClientInfo(this.userID, this.userPassword).subscribe(result => {
        console.log(JSON.stringify(result));
        if (JSON.parse(JSON.stringify(result)).boolean == true) {
          console.log('있는 정보입니다. 접속자: '+ JSON.parse(JSON.stringify(result)).userName);
          this.userName = JSON.parse(JSON.stringify(result)).userName;
        } else {
          console.log('없는 정보입니다.');
        }
      });
    }
    /*
    세션을 이용한 로그인 과정이 여기에 들어간다.
     */

    this.notifyService.notifyOther({from: 'app.component', to: 'handle-temporary-sugang-list.component', content: {
      state: (st === true) ? 'Login' : 'Logout',
      id: this.userID
    }});

    this.userPassword = '';
    this.userID = '';
    this.userName = '';
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
