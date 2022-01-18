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
  demo!: any;
  testArray: any = []

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
    this.demo = this.demo.data.flat()
    this.totalProductsInCart = data.length
    this.demo = this.demo.map((data:any)=>{
      return  {
        _id: data._id,
        id: data.id,
        image: data.image.slice(12),
        product: data.product,
        price: data.price,
        quantity: data.quantity
      } 
    }) 
    this.productName = this.demo
   this.cartTotal(this.productName)
  }

  cartTotal(data: productModel[]){
    let price:any = []
    this.total = data.map((element:productModel)=>{
      price = element.price * element.quantity
      return price
    })
    this.total = this.total.reduce((previous:any, current:any)=>{
      return previous + current
    })
}

  increment(data: productModel){
    this.totalProductsInCart = data.quantity + 1
    data.quantity = data.quantity + 1
    let test = this.demo.map((element:any)=>{
      if(data.product === element.product){
        this.testArray.push({'product':element.id, 'quantity': data.quantity, '_id':element._id})
      }
    })
    this.total = this.total + data.price
    this.myService.updateCart(this.testArray).subscribe(
      (data) => {this.toastr.success("Cart updated successfully"),window.location.reload()},
      (error) => this.toastr.error(error.error.message,"Unable to update the cart")
    )
  }
  

  decrement(data: productModel){
    if(this.totalProductsInCart === 0){
        this.totalProductsInCart = 1
        data.quantity = 1
    }else{
      this.totalProductsInCart = data.quantity - 1
      data.quantity = data.quantity - 1
      this.total = this.total - data.price
    }
    let test = this.demo.map((element:any)=>{
    if(data.product === element.product){
      this.testArray.push({'product':element.id, 'quantity': data.quantity, '_id':element._id})
    }
  })
    this.myService.updateCart(this.testArray).subscribe(
      (data) => {this.toastr.success("Cart updated successfully"),window.location.reload()},
      (error) => this.toastr.error(error.error.message,"Unable to update the cart")
    )
  }

  checkout(){
    let data = this.productName
    let total = this.total
    let test = {orderdetails: data}
    this.myService.checkout(test, total).subscribe(
      (data) => {this.toastr.success("order placed")
    },
      (error) => this.toastr.error(error.error.message,"Unable to place the order")
    )
    this.myService.clearCart().subscribe(
      (data) => { this.router.navigate(['your-orders'])},
      (error) => this.toastr.error(error.error.message,"Unable to clear the cart")
    )
  }

  deleteProduct(data: productModel) {
    console.log(data)
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
