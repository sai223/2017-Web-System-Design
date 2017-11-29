import {Input, Component} from '@angular/core';

import {Sugang} from './Sugang';

@Component({
  selector: 'app-suganglist',
  templateUrl: './sugangList.component.html',
  styleUrls: ['./sugangList.component.css']
})

export class SugangListComponent {
  @Input() sugangList: Sugang[];
  currentSugangName: string;
  currentSugangNumber: string;
}
