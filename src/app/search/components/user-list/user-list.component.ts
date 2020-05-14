import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from '../../../models/user';
import {Merchant} from '../../../models/merchant';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  @Input() userList: (User | Merchant)[];

  @Output() public saveClicked = new EventEmitter();

  public trackById(item) {
    return item.id;
  }

}
