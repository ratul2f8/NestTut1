import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { User } from './Entities/User';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      name: 'Helena',
      id: 1,
    },
    {
      name: 'Pearson',
      id: 2,
    },
    {
      name: 'Rony',
      id: 3,
    },
  ];

  getUsers() {
    return this.users;
  }

  getParticularUser(id: number) {
    return this.users.find((obj) => obj.id === id);
  }

  createMewUser(user: CreateUserDto) {
    const newUser: User = new User(user.name, this.users.length + 1);
    this.users.push(newUser);
    return newUser;
  }

  getUserBySearchTerm(isMultiple: boolean, searchTerm: string) {
    if (isMultiple) {
      return this.users.filter((obj) =>
        obj.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    } else {
      return this.users.find((obj) =>
        obj.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
  }
}
