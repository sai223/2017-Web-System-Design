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
  @ViewChild('logInSugangTemplate') logInSugangTemplate: TemplateRef<any>;
  @ViewChild('logInTimetableTemplate') logInTimetableTemplate: TemplateRef<any>;
  @ViewChild('logOutTemplate') logOutTemplate: TemplateRef<any>;
  Monday: TableItem[] = [];
  Tuesday: TableItem[] = [];
  Wednesday: TableItem[] = [];
  Thursday: TableItem[] = [];
  Friday: TableItem[] = [];
  numberingArray: boolean[]
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
    private httpService: HttpService,
  ) {}
  ngOnInit() {
    if(this.currentPage === 2){
      console.log('ngOnINIT GETALLDAYARRAY!!');
      this.getAllDayArray();
    }
    this.currentTemplate = this.logOutTemplate;
    this.currentView = this.vcr.createEmbeddedView(this.currentTemplate);
    this.httpService.analyzeSession().subscribe(result => {
      if (JSON.parse(JSON.stringify(result)).boolean === true) {
        console.log('세션 유지 같은 브라우저 접속자: ' + JSON.parse(JSON.stringify(result)).userName);
        this.userName = JSON.parse(JSON.stringify(result)).userName;
        this.loginState = true;

        this.currentPage = JSON.parse(JSON.stringify(result)).page;



        this.changeTemplate();

        this.getAllSubject();
      } else {
        console.log('첫접속 브라우저');
      }
    });
  }
  handleLogInOut(flag: boolean) {
    if (flag === true) { // logout -> login
      this.httpService.logIn(this.userID, this.userPassword).subscribe(result => {
        if (result['boolean'] === true) { // login success
          this.userID = '';
          this.userPassword = '';
          this.userName = result['userName'];
          this.loginState = true;
          this.changeTemplate();
          this.getAllSubject();
        }else { // login fail
          alert('계정 정보가 존재하지 않습니다.');
          this.userID = '';
          this.userPassword = '';
        }
      });
    }else if (flag === false) { // login -> logout
      this.httpService.logOut().subscribe(result => {
        this.userName = '';
        this.enrollList_T = [];
        this.sugangList = [];
        this.loginState = false;
        this.changeTemplate();
      });
    }
  }
  clearLoginModal() {
    this.userID = '';
    this.userPassword = '';
  }
  clearSignupModal() {
    this.signUpID = '';
    this.signUpName = '';
    this.signUpPw = '';
    this.re_signUpPw = '';
  }
  changeTemplate() {
    if(this.currentPage === 2){
      console.log('ngOnINIT GETALLDAYARRAY!!');
      this.getAllDayArray();
    }

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
    this.currentView.destroy();
    console.log('change5');
    this.currentView = this.vcr.createEmbeddedView(this.currentTemplate);
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
  getAllDayArray() {
    this.httpService.getAllDayArray()
      .subscribe(dayArray => {
        if(dayArray === null){
          console.log('$$$$$$$$$$$$$$$$$$$');
          return;
        }
        console.log('###################');
        let tmp1: TableItem[] = [];
        let tmp2: TableItem[] = [];
        let tmp3: TableItem[] = [];
        let tmp4: TableItem[] = [];
        let tmp5: TableItem[] = [];
        let numberingTmp: boolean[] = [];
         console.log('서버에서 요일 배열가져오기1',dayArray);
         Object.keys(dayArray).forEach(key => {
           for (let i = 0; i < Object.keys(dayArray[key]).length; i++){
             // console.log('key is', dayArray[key][i]);
             if(key === 'Monday_R'){
               tmp1.push(dayArray[key][i]);
             }
             else if (key === 'Tuesday_R'){
               tmp2.push(dayArray[key][i]);
             }
             else if (key === 'Wednesday_R'){
               tmp3.push(dayArray[key][i]);
             }
             else if (key === 'Thursday_R'){
               tmp4.push(dayArray[key][i]);
             }
             else if (key === 'Friday_R'){
               tmp5.push(dayArray[key][i]);
             }
           }
           if (key === 'numberingArray') {
             for (let i = 0; i < Object.keys(dayArray[key]).length; i++) {
               numberingTmp.push(dayArray[key][i]);
              }
              this.numberingArray = numberingTmp;
           }
           // console.log('print', dayArray[key]);
           // console.log('print type', typeof dayArray[key]);
         });
        // console.log('tmp출력',tmp1,tmp2,tmp3,tmp4,tmp5);
        this.Monday = tmp1;
        this.Tuesday = tmp2;
        this.Wednesday = tmp3;
        this.Thursday = tmp4;
        this.Friday = tmp5;
        this.numberingArray = numberingTmp;

         /*this.Monday = dayArray[0];
         this.Tuesday = dayArray[1];
         this.Wednesday = dayArray[2];
         this.Thursday = dayArray[3];
         this.Friday = dayArray[4];
         */
      console.log('서버에서 요일 배열가져오기2',this.Monday,this.Tuesday,this.Wednesday,this.Thursday,this.Friday);
      /*
      *    .subscribe(searchSubject => {

        //console.log(searchSubject.major);
          console.log(searchSubject, 'is upload!');

          for(var i =0; i< Object.keys(searchSubject).length;i++){
            console.log(searchSubject[i]);
          }*/
    });
  }
  signUpID: string;
  signUpName: string;
  signUpPw: string;
  re_signUpPw: string;
  signUp() {
    if (this.signUpPw === this.re_signUpPw) {
      this.httpService.requestSignUp(this.signUpID, this.signUpName, this.signUpPw).subscribe(result => {
        if (result['boolean'] === false) {
          alert('이미 존재하는 아이디 입니다.');
        }else {
          alert('회원가입 완료');
          this.currentView.destroy();
          this.currentTemplate = this.logOutTemplate;
          this.currentView = this.vcr.createEmbeddedView(this.currentTemplate);
        }
      });
    }else {
      alert('동일한 비밀번호를 입력하세요.');
    }
    this.clearSignupModal();
  }
  changeCurrentPage(no: number) {
    if (this.currentPage === 1) {
      if (no !== 1) {
        this.currentPage = 2;
        this.getAllDayArray();
        this.httpService.pageSession(this.currentPage).subscribe();
        this.currentView.destroy();
        this.changeTemplate();
      }
    }else if (this.currentPage === 2) {
      if (no !== 2) {
        this.currentPage = 1;
        this.httpService.pageSession(this.currentPage).subscribe();
        this.currentView.destroy();
        this.changeTemplate();
      }
    }
  }
  reflectEnrollList_T(enrollList: Subject[]) {
    this.enrollList_T = enrollList;
  }
}
