import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interface/user';

@Injectable()
export class UserService {
  public users: User[] = [];
  getuser(): User[] {
    return this.users;
  }
  getusers(email: string): User {
    const userdata = this.users.filter((i) => i.email === email)[0];
    if (userdata && Array.isArray(userdata) && userdata.length > 0) {
      return userdata[0];
    }
    throw new NotFoundException('User NNOt Found');
    //Exception filter customize data which you sending interceptor
  }
  adduser(user: User): User {
    this.users.push(user);
    return user;
  }
  deleteuser(email: string): User[] {
    const remaininguser = this.users.filter((i) => i.email !== email);
    this.users = remaininguser;
    return this.users;
  }
}
