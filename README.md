# 2017-Web-System-Design
Repository for Final Project

Git Manual
----------

#### 초기 세팅
> 1. local에서 폴더를 하나 정한다.
> 2. 해당 폴더에서 git bash 실행
> 3. git init
> 4. git remote add origin https://github.com/sai223/2017-Web-System-Design
> 5. local 폴더의 .git 를 삭제하면 초기화된다.
*****
#### Git --> Local
> **git pull origin master** : git에 올라가 있는 프로젝트의 **현재 버전**으로 local을 바꾼다.
>> **git clone URL** 명령은 아래의 명령들을 하나로 묶은 것.
>> * git init
>> * git remote add origin URL
>> * git pull origin master
*****
#### Local --> Git
> 1. __git add *__ 또는 **git add 파일명/폴더명** : add 대상을 stage area에 올린다.
>> **git status** : 작업 도중에 현재까지 변경된 사항 등의 정보를 알 수 있다.
> 2. **git commit -m "commit message"** : stage area에 있는 내용을 local repository에 올린다.
>> commit message naming 규칙 : YYYYMMDD-이름-설명 (예시: 20171122-이인태-README.md 수정)
> 3. **git push origin master** : local repository에 있는 내용을 github repository에 올린다. 올리면 내용이 **덮어씌워**진다.
> 4. 용량 때문에 node_modules 폴더를 제외하고 올리는 것이 좋다. add할 때 node_modules 폴더만 제외하거나, 혹은 아래의 방법을 이용.
>> 1. local 폴더에서 **touch .gitignore** 실행하면 .gitignore라는 확장자가 없는 빈 파일이 생성된다.
>> 2. 해당 파일에 **node_modules/** 라고 적어두면 add할 때 자동으로 제외된다.

*****
*****

Angular2 - Notify Service Manual
--------------------------------
#### 설명
Component간에 데이터를 주고받을 수 있다.

#### 데이터를 보내는 Component에서 사용 예시
<pre><code>
import { NotifyService } from './notify-service';

export class SendComponent {
    constructor(
        private notifyService: NotifyService
    ) {}
    notifyFunction() {
        this.notifyService.notifyOther({from: 'SendComponent', to: 'ReceiveComponent', content: {data: 'example'}});
    }
}
</code></pre>

#### 데이터를 받는 Component에서 사용 예시
<pre><code>
import { OnInit } from '@angular/core';
import { NotifyService } from './notify-service';
import { Subscription } from 'rxjs/Subscription';

export class ReceiveComponent implements OnInit {
    private subscription: Subscription;
    constructor(
        private notifyService: NotifyService
    ) {}
    ngOnInit() {
        this.subscription = this.notifyService.notifyObservable$.subscribe((res) => {
            if(res.from === 'SendComponent' && res.to === 'ReceiveComponent') {
                console.log(res.content.data);
            }
        });
    }
}
</code></pre>

*****
*****

Angular2 - Confirm Service Manual
--------------------------------
#### 설명
윈도우 Confirm 박스를 이용하여 사용자로부터 True/False 를 입력받을 수 있다.<br>
사용자가 '확인'을 누를 경우 true를, '취소'를 누를 경우 false를 반환한다. 이를 이용하여 동적인 logic을 부여할 수 있다.

#### Confirm Service 사용 예시
<pre><code>
import { ConfirmService } from './confirm-service';

export class ComponentName {
    constructor(private confirmService: ConfirmService) {}

    canDeactive(msg: string) {
        switch (msg) {
            case 'delete':
                return window.confirm('정말 삭제하시겠습니까?');
            case 'update':
                return window.confirm('정말 수정하시겠습니가?');
             ...
        }
        return true;
    }
    func() {
        if(this.canDeactive('delete') === true) {
            // 삭제한다.
        }else {
            // 삭제하지 않는다.
        }
    }
}
</code></pre>

**박승현 수정**
