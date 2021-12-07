import { Injectable } from '@angular/core';
import { BaseService } from './baseService';
import { userModel } from './interface';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  user!: userModel;
  constructor(private myService: BaseService) {
    this.user = this.getUser(this.token)
  }

  get token(): any{
    return localStorage.getItem('token')
  }

  public isLoggedIn() {
    let token: string | null =  localStorage.getItem('token')
    if (localStorage.getItem('token')) {
      this.myService.loginStatus.next(true);
      this.user = this.getUser(token!)
    }
    return !!localStorage.getItem('token');
  }

  private getUser(token: string) {
    return JSON.parse(atob(token.split('.')[1])) as userModel
  }
}