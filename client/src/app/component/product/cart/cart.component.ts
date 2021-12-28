import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseService } from 'src/app/Shared/baseService';
import { cartOrder, productModel } from 'src/app/Shared/interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
 
  public productName!: productModel[];
  public totalProductsInCart!: number;
  public cartItems!: productModel;
  total!: any;
  initialPrice: any = 0;
  demo!: productModel[];

  constructor( private toastr: ToastrService, private myService: BaseService, private router: Router) { }

  ngOnInit() {
    this.loadCartData()
  }

  loadCartData(){
    this.myService.getCartProducts().subscribe(
      (data) => { this.getData(data), console.log(data)},
      (error) => { this.toastr.error(error.error.message, "unable to fetch cart products")}
    )
  }

  getData(data: productModel[]){
    this.demo = data
    this.totalProductsInCart = data.length
    this.productName = data 
   this.cartTotal(this.productName)
  }

  cartTotal(data: productModel[]){
    let price:any = 0
    this.total = data.map((elem:any) => {
      return price = elem.price * elem.quantity
    })
    this.total = this.total.reduce((previous:number, current:number) => previous + current)
    console.log(this.total)
  }

  increment(data: productModel){
    ++this.totalProductsInCart
    ++data.quantity
    this.total = this.total + data.price
    this.myService.updateCart(data).subscribe(
      (data) => this.toastr.success("Cart updated successfully"),
      (error) => this.toastr.error(error.error.message,"Unable to update the cart")
    )
  }

  decrement(data: productModel){
    --this.totalProductsInCart
    --data.quantity
    this.total = this.total - data.price
    this.myService.updateCart(data).subscribe(
      (data) => this.toastr.success("Cart updated successfully"),
      (error) => this.toastr.error(error.error.message,"Unable to update the cart")
    )
  }

  // increment(data: productModel){
  //   console.log(data)
  //   data.quantity =+ 1
  // }

  // decrement(data: productModel){
  //   console.log(data)
  // }

  checkout(){
    let data = this.productName
    let total = this.total
    let test = {orderdetails: data}
    this.myService.checkout(test, total).subscribe(
      (data) => {this.toastr.success("order placed")},
      (error) => this.toastr.error(error.error.message,"Unable to place the order")
    )
    this.myService.clearCart(data).subscribe(
      (data) => { this.router.navigate(['your-orders'])},
      (error) => this.toastr.error(error.error.message,"Unable to clear the cart")
    )
  }

  deleteProduct(data: productModel) {
    if (window.confirm('Are you sure you want to remove this product from cart')) {
      this.myService.deleteProduct(data).subscribe(
        (data) => {      
          this.toastr.success('Product has been removed from the cart');
          window.location.reload()
        },
        (error) => this.toastr.error(error.error.message,'Unable to remove the product from cart')
      )}
  }
  
}
