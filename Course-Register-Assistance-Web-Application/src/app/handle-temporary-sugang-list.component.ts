import {Component, OnInit} from '@angular/core';

import {Subscription} from 'rxjs/Subscription';
import {NotifyService} from './notify-service';
import {Subject} from './Subject';

export class HandleTemporarySugangListComponent implements OnInit {
  private subscription: Subscription;
  constructor(
    private notifyService: NotifyService
  ) {}
  ngOnInit() {
    this.subscription = this.notifyService.notifyObservable$.subscribe((res) => {
      if (res.from === 'app.component' && res.to === 'handle-temporary-sugang-list.component') {
        //res.content.state
        //res.content.id
      }
    });
  }
}
