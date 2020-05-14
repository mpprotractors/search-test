import {Merchant} from '../../models/merchant';

export class MerchantMapper {
  static fromDto(dto: Merchant[]): Merchant[] {
    if (dto === null) {
      return null;
    }

    return dto.map((item: Merchant) => {
      const user = new Merchant();
      user.id = item.id;
      user.name = item.name;
      user.vat = item.vat;
      return user;
    });
  }
}
