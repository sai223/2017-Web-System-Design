import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  httpGETRequest(url: string) {
    return this.http.get(url);
  }
  httpPOSTRequest(url: string, data: Object) {
    return this.http.post(url, data);
  }
}
