import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseService } from 'src/app/Shared/baseService';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  public userName!: string | null;
  public temp: any = [];
  public order: any = []

  constructor(
    private myService: BaseService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCartOrders();
    this.user();
    // this.clearCart();
  }

  getCartOrders() {
    this.myService.getCartOrders().subscribe(
      (data) => {
        let temp: any = data;
        this.productDetails(temp.data);
      },
      (error) =>
        this.toastr.error(error.error.message, 'Unable to fetch your orders')
    );
  }

  productDetails(data: any) {
    this.temp = data.product
    console.log
    this.temp = data.map((item: any, index: number) => {
      let demo = item.product.map((element: any) => {
        return {
          productName: element.product,
          price: element.price,
          image: element.image.slice(12),
          created: element.createdAt,
          quantity: element.quantity
        };
      });
      return {demo, total: item.total,
        orderId: item._id,};
    });
    console.log(this.temp);
  }

  // clearCart() {
  // this.myService.clearCart().subscribe(
  //   //     (data) => { this.router.navigate(['your-orders'])},
  //   //     (error) => this.toastr.error(error.error.message,"Unable to clear the cart")
  //   //   )

  // }

  user() {
    this.userName = localStorage.getItem('user');
  }
}
