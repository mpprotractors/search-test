import { IMerchant } from '../../models/merchant';
import { IUser } from '../../models/user';

export abstract class SearchResult {
  id: string;
  name: string;

  constructor(dto: unknown) {
    Object.assign(this, dto);
  }

  abstract get additionalInfo(): string;

  abstract get icon(): string;
}

export class Merchant extends SearchResult implements IMerchant {
  id: string;
  name: string;
  vat: string;

  public get additionalInfo() {
    return this.vat;
  }

  public get icon() {
    return '🏭';
  }
}

export class User extends SearchResult implements IUser {
  id: string;
  name: string;
  personId: string;

  public get additionalInfo() {
    return this.personId;
  }

  public get icon() {
    return '😎';
  }
}

