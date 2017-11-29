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
  logOut(id: string) {
    return this.http.post('/logout', {
      id: id
    });
  }
  analyzeSession() { // 페이지 시작할때 세션 유무 확인하기
    return this.http.get('/sessionCheck');
  }
  getAllSubjects(id: string) {
    return this.http.get('/getAllSubjects');
  }
}
