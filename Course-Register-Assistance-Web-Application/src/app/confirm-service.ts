import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {Observable} from 'rxjs/Observable';

export interface CanComponentDeactive {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class ConfirmService implements CanDeactivate<CanComponentDeactive> {
  canDeactivate(component: CanComponentDeactive) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
