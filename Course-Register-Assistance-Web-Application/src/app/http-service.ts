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
  analyzeSession() { // 흠.. 어떤 용도인지?
    return this.http.get('/sugangAssit');
  }
  getAllSubjects(id: string) {
    return this.http.post('/getAllSubjects', {
      id: id
    });
  }
}
