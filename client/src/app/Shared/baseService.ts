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

  constructor(private _http: HttpClient) { }

  submitRegister(body:newUserModel){
    return this._http.post(`${environment.serverAddress}/signup`, body,{
      observe:'body'
    });
  }

  getByOrder(id:string | null){
    return this._http.get(`${environment.serverAddress}/orderId/`+id)
  };

  login(body:loginModel):Observable<loginDetails>{
    return this._http.post<loginDetails>(`${environment.serverAddress}/login`, body,{
      observe:'body'
    });
  }

  addOrder(body:orderModel){
    return this._http.post(`${environment.serverAddress}/createorder`, body,{
      observe:'body'
    })
  }
  
  getOrder():Observable<orderDetailsModel[]>{
    return this._http.get<orderDetailsModel[]>(`${environment.serverAddress}/getorder`)
  };

  getOrderstatus():Observable<orderTestStatus[]>{
    return this._http.get<orderTestStatus[]>(`${environment.serverAddress}/orderstatus`)
  };
  
  deleteorder(body:Number){
    return this._http.put(`${environment.serverAddress}/deleteorder`,{id:body},{
      observe:'body'
    })
  };

  updateOrder(value:orderDetailsModel){
    return this._http.post(`${environment.serverAddress}/updateorder`, value)
  };

  getUserName() {
    return this._http.get(`${environment.serverAddress}/username`, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token') as any)
    });
  }

  submitEmail(body:string){
    return this._http.post(`${environment.serverAddress}/forgotPassword`, body,{
      observe:'body'
    });
}

  checkUser(token:any){
    return this._http.post(`${environment.serverAddress}/resetPassword/${token}`,{
      observe:'body'
    })
  }

  updatePassword(token:any, body:any){
    return this._http.post(`${environment.serverAddress}/confirm-reset-password/${token}`, body,{
      observe:'body'
    });
}

}

