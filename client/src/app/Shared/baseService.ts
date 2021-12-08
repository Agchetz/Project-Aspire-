import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { orderDetailsModel, orderModel, newUserModel, loginModel, loginDetails, orderTestStatus } from './interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class BaseService {

  public behaviourSubject = new BehaviorSubject<orderDetailsModel | null>(null)
  public userName = new BehaviorSubject("")
  public loginStatus = new BehaviorSubject<boolean> (false)
  public adminRole = new BehaviorSubject<boolean> (false)

  constructor(private http: HttpClient) { }

  submitRegister(body:newUserModel){
    return this.http.post(`${environment.serverAddress}/signup`, body,{
      observe:'body'
    });
  }

  getByOrder(id:string | null){
    return this.http.get(`${environment.serverAddress}/orderId/`+id)
  };

  login(body:loginModel):Observable<loginDetails>{
    return this.http.post<loginDetails>(`${environment.serverAddress}/login`, body,{
      observe:'body'
    });
  }

  addOrder(body:orderModel){
    return this.http.post(`${environment.serverAddress}/createorder`, body,{
      observe:'body'
    })
  }
  
  getOrder():Observable<orderDetailsModel[]>{
    return this.http.get<orderDetailsModel[]>(`${environment.serverAddress}/getorder`)
  };

  getOrderstatus():Observable<orderTestStatus[]>{
    return this.http.get<orderTestStatus[]>(`${environment.serverAddress}/orderstatus`)
  };
  
  deleteorder(body:Number){
    return this.http.put(`${environment.serverAddress}/deleteorder`,{id:body},{
      observe:'body'
    })
  };

  updateOrder(value:orderDetailsModel){
    return this.http.post(`${environment.serverAddress}/updateorder`, value)
  };

  getUserName() {
    return this.http.get(`${environment.serverAddress}/username`, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token') as any)
    });
  }

  submitEmail(body:string){
    return this.http.post(`${environment.serverAddress}/forgotPassword`, body,{
      observe:'body'
    });
}

  checkUser(token:any){
    return this.http.post(`${environment.serverAddress}/resetPassword/${token}`,{
      observe:'body'
    })
  }

  updatePassword(token:any, body:any){
    return this.http.post(`${environment.serverAddress}/confirm-reset-password/${token}`, body,{
      observe:'body'
    });
}

}

