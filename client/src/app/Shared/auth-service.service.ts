import { Injectable } from '@angular/core';
import { BaseService } from './baseService';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private myService: BaseService) {}

  public isLoggedIn() {
    if (localStorage.getItem('token')) {
      this.myService.loginStatus.next(true);
    }
    return !!localStorage.getItem('token');
  }
}
