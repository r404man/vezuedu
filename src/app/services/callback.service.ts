import { Injectable } from '@angular/core';
import User from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class CallbackService {
  user?: User;
  constructor() {}
  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  getUser() {
    let user = JSON.parse(localStorage.getItem('user')!);
    this.user = user;
    return this.user;
  }
}
