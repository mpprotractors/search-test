import {User} from '../../models/user';

export class UserMapper {
  static fromDto(dto: User[]): User[] {
    if (dto === null) {
      return null;
    }

    return dto.map((item: User) => {
      const user = new User();
      user.id = item.id;
      user.name = item.name;
      user.personId = item.personId;
      return user;
    });
  }
}
