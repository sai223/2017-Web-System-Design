import {Component, OnInit, OnDestroy} from '@angular/core';

import {Subscription} from 'rxjs/Subscription';
import {NotifyService} from './notify-service';
import {HttpService} from './http-service';
import {Sugang} from './Sugang';

@Component({
  selector: 'app-handle-suganglist',
  templateUrl: './handle-sugangList.component.html',
  styleUrls: ['./handle-sugangList.component.css']
})

export class HandleSugangListComponent implements OnInit, OnDestroy {
  sugangList: Sugang[];
  currentSugangName: string;
  currentSugangNumber: string;
  isLogin: boolean;
  private subscription: Subscription;
  constructor(
    private notifyService: NotifyService,
    private httpService: HttpService

  ) {}
  ngOnInit() {
    this.subscription = this.notifyService.notifyObservable$.subscribe((res) => {
      if (res.from === 'app.component' && res.to === 'handle-sugangList.component') {
        if (res.content.state === 'Login') {
          this.isLogin = true;
          this.handleLogin();
        }else if (res.content.state === 'Logout') {
          this.isLogin = false;
          this.handleLogout();
        }
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  handleLogin() {
    /*
    * 로그인 신호가 오면, id값을 가지고 서버에서 subject 배열을 가져와서 sugangList에 넣는다.
    * sugangList를 굳이 따로 만들어주는 이유는, 첫번째 페이지인 여기서는 'priority'값과 'isTemporary'값이 추가로 필요하기 때문이다.
    * priority값은 우선순위 값이고, isTemporary값은 실제로 subject로 추가된 것인지, 아니면 사용자가 임시로 추가한 것인지 구분하기 위함이다.
    * 이렇게 sugang 리스트를 만들어지면, 이것을 2-way binding 하고 있는 'sugangList.component'가 변화한다.
    * */

    this.httpService.getAllSubjects().subscribe(result => {
      /*
      for (let subject of result['subjects']) { // 서버로부터 받은 subject 배열을 가지고 sugangList를 만든다.
        let sugang = new Sugang(this.sugangList.length, false, subject.subjectName, subject.subjectNumber);
        this.sugangList.push(sugang);
      }
      */
      console.log(result);
      Object.keys(result).forEach(key => {
        console.log(result[key].subjectName);

      });
    });
  }
  handleLogout() {
    /* 로그아웃하면, 더이상 sugang 리스트 기능을 제공하지 않는다.
    * 따라서 sugang 리스트를 빈값으로 초기화 한다.
    * 그러면 마찬가지로 2-way binding하고 있는 'sugangList.component' 역시 변한다.
    * */
    this.sugangList = [];
  }
  sugangListAddition() {
    // 추가버튼 누르면 sugangList에 반영한다.
    let sugang = new Sugang(this.sugangList.length, true, this.currentSugangName, this.currentSugangNumber);
    this.sugangList.push(sugang);
    this.currentSugangName = '';
    this.currentSugangNumber = '';
  }
  sugangListDeletion(index: number) { // 삭제 버튼을 누른 sugang의 priority가 넘어온다. 사실 priority가 index나 마찬가지.
    // 삭제버튼 누르면 sugangList에 반영한다.
    // 단, 로그인 했을 때 초기에 가져왔떤 sugang값에 대해서는 삭제를 할 수 없고, 삭제버튼도 없다.
    this.sugangList.splice(index, 1);
  }
}
