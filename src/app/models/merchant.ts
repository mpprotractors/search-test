import {Constants} from '../shared/constants';

export interface Merchant {
  id: string;
  name: string;
  vat: string;
}

export class Merchant {
  id: string;
  name: string;
  vat: string;
  type: string;

  constructor() {
    this.type = Constants.UserType.Merchant;
  }
}
