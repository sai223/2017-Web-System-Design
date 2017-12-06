import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

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
  getAllSubjects() {
    console.log('겟올섭젝');
    return this.http.get('/getAllSubjects');
  }
  addSubject(isNickname: boolean, subjectName: string, subjectNumber: string) {
    console.log('애드섭젝');
    return this.http.post('/addSubject', {
      isNickname: isNickname,
      subjectName: subjectName,
      subjectNumber: subjectNumber
    });
  }
  deleteSubject(subjectNumber: string) {
    console.log('딜릿섭젝');
    return this.http.post('deleteSubject', {
      subjectNumber: subjectNumber
    });
  }
  searchSubject(subjectType: string, major: string, day: string,
                time: string, subjectName: string, professorName: string){
    return this.http.get(`/searchSubject?subjectType=${subjectType}
    &major=${major}&day=${day}&time=${time}&subjectName=${subjectName}
    &professorName=${professorName}`);
  }
  requestSignUp(signID: string, signName: string, signPW: string) {
    return this.http.post('/signUp/requestSignUp', {
      signID: signID,
      signName: signName,
      signPW: signPW
    });
  }
}
