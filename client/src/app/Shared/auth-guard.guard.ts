import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor (private authService: AuthServiceService, private router: Router){}
  
  canActivate (): boolean{
    if(this.authService.isLoggedIn()){
      return true;
    }
    alert("Please login to access these paths")
    this.router.navigate(['login'])
    return false;
  }
 
  
}
