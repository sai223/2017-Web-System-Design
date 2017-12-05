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
    return this.http.post('/searchSubject', {
      subjectType_2B: subjectType,
      major_2B: major,
      day_2B: day,
      time_2B: time,
      subjectName_2B: subjectName,
      professorName_2B: professorName
    });
  }
  /*searchSubject(subjectType: string, major: string, day: string,
                time: string, subjectName: string, professorName: string){
    return this.http.get(`/searchSubject?subjectType_2B=${subjectType}
    &major_2B=${major}&day_2B=${day}&time_2B=${time}&subjectName_2B=${subjectName}
    &professorName_2B=${professorName}`);
  }*/
  setTime(hour: String, min: String, sec: String) {
    console.log('2-');
    return this.http.post('/setTime', {
      hour: hour,
      min: min,
      sec: sec
    });
  }
  getTime() {
    return this.http.get('/getTime');
  }
}
