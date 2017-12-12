import {Component, OnInit, ViewChild, TemplateRef,
  ViewContainerRef, EmbeddedViewRef} from '@angular/core';

import {HttpService} from './http-service';
import {Subject} from './Subject';
import {Sugang} from './Sugang';
import {TableItem} from './tableItem';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class  AppComponent implements OnInit {
  @ViewChild('logInSugangTemplate') logInSugangTemplate: TemplateRef<any>;         // 로그인 상태 - '수강신청' 페이지 탬플릿
  @ViewChild('logInTimetableTemplate') logInTimetableTemplate: TemplateRef<any>;  // 로그인 상태 - '시간표 조회' 페이지 탬플릿
  @ViewChild('logOutTemplate') logOutTemplate: TemplateRef<any>;                    // 로그아웃 상태 탬플릿
  currentTemplate: TemplateRef<any>;  // 현재 페이지에서 보이도록 할 템플릿을 할당
  currentView: EmbeddedViewRef<any>;  // 템플릿의 뷰를 컨트롤하기 위한 변수.

  Monday: TableItem[] = [];
  Tuesday: TableItem[] = [];
  Wednesday: TableItem[] = [];
  Thursday: TableItem[] = [];
  Friday: TableItem[] = [];
  numberingArray: boolean[] = [];
  enrollList_T: Subject[] = [];
  sugangList: Sugang[] = [];  // '수강신청' 페이지의 수강신청 리스트 값.
  currentPage: number;  // 1: '수강신청' 페이지, 2: '시간표 조회' 페이지
  loginState: boolean;  // true: 로그인 상태, false: 로그아웃 상태
  userID: string; // 로그인할 때 사용자의 아이디 입력값
  userPassword: string; // 로그인할 때 사용자의 비밀번호 입력값
  userName: string; // 로그인 후 서버가 리턴하는 사용자 이름값
  signUpID: string; // 회원가입시 사용자의 아이디 입력값
  signUpName: string; // 회원가입시 사용자의 이름 입력값
  signUpPw: string; // 회원가입시 사용자의 비밀번호 입력값
  re_signUpPw: string; // 회원가입시 사용자의 비밀번호 재 입력값

  constructor(
    private vcr: ViewContainerRef,
    private httpService: HttpService,
  ) {}

  ngOnInit() {
    this.currentTemplate = this.logOutTemplate; // 초기 템플릿은 로그아웃 상태.
    this.currentView = this.vcr.createEmbeddedView(this.currentTemplate); // 현재 템플릿을 뷰를 통해 생성.

    this.httpService.analyzeSession().subscribe(result => { // 로그인된 상태일 경우 세션을 가져온다.
      if (JSON.parse(JSON.stringify(result)).boolean === true) {
        this.userName = JSON.parse(JSON.stringify(result)).userName; // 세션을 통해 사용자의 이름을 가져온다.
        this.loginState = true; // 세션이 있다면 로그인 상태이다.
        this.currentPage = JSON.parse(JSON.stringify(result)).page; // 세션이 있다면 마지막 페이지를 기억한다.
        this.changeTemplate();
        this.getAllSubjects_F();
        this.getAllSubject();
        this.getAllDayArray();
      }
    });
  }
  handleLogInOut(flag: boolean) {
    /*
    * 사용자가 로그인/로그아웃 버튼을 눌렀을 때 실행되는 함수.
    * 파라미터 flag가 true면 로그인을, false면 로그아웃을 처리한다.
    * */
    if (flag === true) {
      // 로그인 처리
      this.httpService.logIn(this.userID, this.userPassword).subscribe(result => {
        if (result['boolean'] === true) {
          // 로그인 성공
          this.userID = ''; // 이제 필요없기 때문에 빈 값으로 초기화
          this.userPassword = ''; // 이제 필요없기 때문에 빈 값으로 초기화
          this.userName = result['userName'];
          this.loginState = true;
          this.changeTemplate();
          this.getAllSubject();
          this.getAllDayArray();
        }else {
          // 로그인 실패
          alert('계정 정보가 존재하지 않습니다.');
          this.userID = '';
          this.userPassword = '';
        }
      });
    }else if (flag === false) {
      // 로그아웃 처리
      this.httpService.logOut().subscribe(result => {
        this.userName = '';
        this.enrollList_T = []; // 계정별로 필요한 값이기 때문에 빈 값으로 초기화
        this.sugangList = [];   // 계정별로 필요한 값이기 때문에 빈 값으로 초기화
        this.loginState = false;
        this.changeTemplate();
      });
    }
  }
  clearLoginModal() {
    // 로그인 모달을 닫을 경우 입력란을 비워주기 위한 함수
    this.userID = '';
    this.userPassword = '';
  }
  clearSignupModal() {
    // 회원가입 모달을 닫을 경우 입력란을 비워주기 위한 함수
    this.signUpID = '';
    this.signUpName = '';
    this.signUpPw = '';
    this.re_signUpPw = '';
  }
  changeTemplate() {
    if (this.currentPage === 1) {
      this.getAllSubjects_F();
    }
    if (this.currentPage === 2) {
      this.getAllDayArray();
    }

    // 로그인 상태와 현재 페이지값에 따라 표시할 템플릿을 설정해준다.
    if (this.loginState === false) {
      this.currentTemplate = this.logOutTemplate;
    }else {
      if (this.currentPage === 1) {
        this.currentTemplate = this.logInSugangTemplate;
      }else if (this.currentPage === 2) {
        this.currentTemplate = this.logInTimetableTemplate;
      } else {
        this.currentPage = 1;
        this.currentTemplate = this.logInSugangTemplate;
      }
    }
    // 현재 템플릿 파괴 후 생성
    this.currentView.destroy();
    this.currentView = this.vcr.createEmbeddedView(this.currentTemplate);
  }
  getAllSubject() {
    this.httpService.getAllSubjects().subscribe(result => {
      this.enrollList_T = []; // 등록된 리스트를 비우고 다시 새로 가져온다.
      Object.keys(result).forEach(key => {
        this.enrollList_T.push(result[key]);
      });
    });
  }
  getAllSubjects_F() {
    this.httpService.getAllSubjects_F().subscribe(result => {
      this.sugangList = []; // 수강 리스트를 비우고 다시 새로 생성한다.
      Object.keys(result).forEach(key => {
        let sugang = new Sugang(result[key].subjectName, result[key].subjectNumber);
        this.sugangList.push(sugang);
      });
    });
  }
  subjectOrderUp(orderSelectedSugang: number) {
    /*
    * 수강신청 페이지에서 리스트의 항목 순서를 위로 올리기 위한 함수.
    * 파라미터로 받은 인덱스가 대상이다.
    * */
    let tmp = this.sugangList[orderSelectedSugang];
    this.sugangList[orderSelectedSugang] = this.sugangList[orderSelectedSugang - 1];
    this.sugangList[orderSelectedSugang - 1] = tmp;

    let tmptmp = this.sugangList;
    this.sugangList = [];
    this.sugangList = tmptmp;
  }
  subjectOrderDown(orderSelectedSugang: number) {
    /*
    * 수강신청 페이지에서 리스트의 항목 순서를 아래로 내리기 위한 함수.
    * 파라미터로 받은 인덱스가 대상이다.
    * */
    let tmp = this.sugangList[orderSelectedSugang];
    this.sugangList[orderSelectedSugang] = this.sugangList[orderSelectedSugang + 1];
    this.sugangList[orderSelectedSugang + 1] = tmp;

    let tmptmp = this.sugangList;
    this.sugangList = [];
    this.sugangList = tmptmp;
  }
  getAllDayArray() {
    this.httpService.getAllDayArray()
      .subscribe(dayArray => {
      // 서버에 데이터가 있으면 (dayArray에 정보가 있으면)
     let tmp1: TableItem[] = [];
     let tmp2: TableItem[] = [];
     let tmp3: TableItem[] = [];
     let tmp4: TableItem[] = [];
     let tmp5: TableItem[] = [];
     let numberingTmp: boolean[] = [];
      Object.keys(dayArray).forEach(key => {
        for (let i = 0; i < Object.keys(dayArray[key]).length; i++){
          // console.log('key is', dayArray[key][i]);
          if(key === 'monday'){
            tmp1.push(dayArray[key][i]);
          }
          else if (key === 'tuesday'){
            tmp2.push(dayArray[key][i]);
          }
          else if (key === 'wednesday'){
            tmp3.push(dayArray[key][i]);
          }
          else if (key === 'thursday'){
            tmp4.push(dayArray[key][i]);
          }
          else if (key === 'friday'){
            tmp5.push(dayArray[key][i]);
          }
          else if (key === 'numberingArray'){
            numberingTmp.push(dayArray[key][i]);
          }
        }
      });
     this.Monday = tmp1;
     this.Tuesday = tmp2;
     this.Wednesday = tmp3;
     this.Thursday = tmp4;
     this.Friday = tmp5;
     this.numberingArray = numberingTmp;
    });
  }
  reflectEnrollList_T(enrollList: Subject[]) {
    this.enrollList_T = enrollList;
  }
  signUp() {
    /*
    * 사용자가 입력한 아이디, 이름, 비밀번호, 비밀번호 재입력값을 이용하여 회원가입을 처리하는 함수.
    * */
    if (this.signUpPw === this.re_signUpPw) {
      this.httpService.requestSignUp(this.signUpID, this.signUpName, this.signUpPw).subscribe(result => {
        if (result['boolean'] === false) {
          alert('이미 존재하는 아이디 입니다.');
        }else {
          alert('회원가입 완료');
          this.currentView.destroy();
          this.currentTemplate = this.logOutTemplate; // 회원가입 완료 후에는 로그아웃 템플릿이 뜬다.
          this.currentView = this.vcr.createEmbeddedView(this.currentTemplate);
        }
      });
    }else {
      alert('동일한 비밀번호를 입력하세요.');
    }
    this.clearSignupModal();
  }
  changeCurrentPage(no: number) {
    /*
    * 사용자가 '수강신청', '시간표 조회' 페이지를 클릭한 값을 처리하는 함수.
    * */
    if (this.currentPage === 1) {
      if (no !== 1) {
        this.currentPage = 2;
        this.getAllDayArray();
        this.httpService.pageSession(this.currentPage).subscribe(); // 페이지를 바꾼 후, 세션에 기억시킨다.
        this.currentView.destroy();
        this.changeTemplate();
      }
    }else if (this.currentPage === 2) {
      if (no !== 2) {
        this.currentPage = 1;
        this.httpService.pageSession(this.currentPage).subscribe(); // 페이지를 바꾼 후, 세션에 기억시킨다.
        this.currentView.destroy();
        this.changeTemplate();
      }
    }
  }
}
