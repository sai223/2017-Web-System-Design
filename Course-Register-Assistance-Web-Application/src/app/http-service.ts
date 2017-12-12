import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TableItem} from './tableItem';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}
  logIn(id: string, pw: string) {
    return this.http.post('/login', {
      id: id,
      pw: pw
    });
  }
  logOut() {
    return this.http.get('/logout');
  }
  analyzeSession() { // 페이지 시작할때 세션 유무 확인하기
    return this.http.get('/sessionCheck');
  }
  pageSession(p) { // 세션에 마지막 페이지  알려주기
    return this.http.post('/sessionPage', { page: p });
  }

  getAllSubjects_F() { // [첫 번째 페이지] 수강신청리스트 가져오기
    return this.http.get('/getAllSubjects_F');
  }

  getAllSubjects() { // [두 번째 페이지] 수강신청항목 리스트 가져오기
    return this.http.get('/getAllSubjects');
  }

  addSubject(isNickname: boolean, subjectName: string, subjectNumber: string) { // [첫 번째 페이지,두 번째 페이지]수강신청리스트와 수강신청항목에 수강과목 추가하기
    return this.http.post('/addSubject', {
      isNickname: isNickname,
      subjectName: subjectName,
      subjectNumber: subjectNumber
    });
  }


  deleteSubject(subjectNumber: string) {   // [첫 번째 페이지]수강신청리스트에서 수강과목 삭제하기  // 두 번째 페이지]수강신청항목에서 수강과목 삭제하기
    return this.http.post('deleteSubject', {
      subjectNumber: subjectNumber
    });
  }

  deleteSubject_F(subjectNumber: string) {
    console.log('딜릿섭젝');
    return this.http.post('deleteSubject_F', {
      subjectNumber: subjectNumber
    });
  }

  getAllDayArray() {   // [두 번째 페이지] 시간표(요일배열)정보 가져오기
    return this.http.get('/getUserTimeTable');
  }
  // [두 번째 페이지] 수강과목 조회하기
  searchSubject(subjectType: string, major: string, day: string,
                time: string, subjectName: string, professorName: string){
    return this.http.post('/searchSubject', {
      subjectType_2B: subjectType,
      major_2B: major,
      day_2B: day,
      time_2B: time,
      subjectName_2B: subjectName,
      professorName_2B: professorName
    });
  }

  // [두 번째 페이지] 시간표(요일배열)정보 수정하기(추가 및 삭제)
  updateArray(Monday_R: TableItem[], Tuesday_R: TableItem[], Wednesday_R: TableItem[], Thursday_R: TableItem[], Friday_R: TableItem[], numberingArray: boolean[]){
    return this.http.post('/updateUserTimeTable' , {
        Monday_R: Monday_R,
        Tuesday_R: Tuesday_R,
        Wednesday_R: Wednesday_R,
        Thursday_R: Thursday_R,
        Friday_R: Friday_R,
        numberingArray: numberingArray
    });
  }
  requestSignUp(signID: string, signName: string, signPW: string) {
    return this.http.post('/signUp/requestSignUp', {
      signID: signID,
      signName: signName,
      signPW: signPW
    });
  }
}
