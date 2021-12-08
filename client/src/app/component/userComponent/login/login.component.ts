import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseService } from 'src/app/Shared/baseService';
import { roleGroups } from 'src/app/Shared/directives/roleGroups';
import { loginDetails } from 'src/app/Shared/interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  private user!: any;
  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private myService: BaseService,
    private toastr: ToastrService,
  ) { }

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  login() {
    if (this.loginForm.valid) {
      this.myService.login(this.loginForm.value).subscribe(
        (data) => {
        this.checkLoginDetails(data)
        },
         (error) => {this.toastr.error(error.error.message,'Login unsuccessful')});
    }else{
      this.toastr.error('Please check Email and Password');}
  }  

  checkLoginDetails(data: loginDetails) {
    if(data.status === 200){
    const data1 = data.data[0].token
    localStorage.setItem('token', data1);
    this.user = localStorage.setItem('user', data.data[1]);
    this.myService.userName.next(this.user);
    this.myService.loginStatus.next(true);
    this.toastr.success(data.message, 'Login Successfull');
    this.router.navigate(['/home']);
  }
}
  
}
