import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseService } from 'src/app/Shared/baseService';
import { productModel } from 'src/app/Shared/interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public userName!: string | null
  temp: any = [];
  created: any;
  totalPrice: any;
  id: any = [];

  constructor(private myService: BaseService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.getCartOrders()
    this.user()
  }

  getCartOrders(){
    this.myService.getCartOrders().subscribe(
      (data) => {this.orderDetails(data)
      },
      (error) => this.toastr.error(error.error.message,"Unable to fetch your orders")
    )
  }

  orderDetails(data:any){
    console.log(data)
    for(let i=0;i<data.length;i++) {
      let test: Array<object> = []
      test = data[i].orderdetails
       this.temp[i] = test.map((item:any) => {
         return  {
          product: item.product,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        }
      }) 
      this.temp[i]._id = data[i]._id
      this.temp[i].date = data[i].createdAt.slice(0,10)
    }
    console.log(this.temp)
    return  this.temp
  }

  user(){
    this.userName = localStorage.getItem('user')
  }

}
