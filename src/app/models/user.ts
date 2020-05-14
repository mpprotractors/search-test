import {Constants} from '../shared/constants';

export interface User {
  id: string;
  name: string;
  personId: string;
}

export class User implements User {
  id: string;
  name: string;
  personId: string;
  type: string;

  constructor() {
    this.type = Constants.UserType.PrivateUser;
  }

}
