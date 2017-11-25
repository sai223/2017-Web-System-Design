import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ServerService {

  constructor(private http: HttpClient) {}

  searchClientInfo(id, pw) {
    const info = JSON.stringify({id: id, pw: pw});
    return this.http.post('/sugangAssit/login', JSON.parse(info));
  }
  analyzeSession(){
    return this.http.get('/sugangAssit');
  }
}
