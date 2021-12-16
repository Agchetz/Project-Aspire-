import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseService } from 'src/app/Shared/baseService';
import { productModel } from 'src/app/Shared/interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
 
  public productName!: productModel[];
  public totalProducts!: number;
  public totalPrice!: productModel;

  constructor( private toastr: ToastrService, private myService: BaseService) { }

  ngOnInit() {
    this.loadCartData()
    this.totalProductPrice()
  }

  loadCartData(){
    this.myService.getCartProducts().subscribe(
      (data) => { this.getData(data) },
      (error) => { this.toastr.error(error.error.message, "unable to fetch cart products")}
    )
  }

  getData(data: productModel[]){
    this.totalProducts = data.length
    this.productName = data.map((element) => { 
       return {
        product: element.product,
        department: element.department,
        price: element.price,
        id: element.id,
        quantity: element.quantity,
        image: element.image,
        user_id: element.user_id
      }
    })
  }

  totalProductPrice(){
    this.myService.getCartProducts().subscribe(
      (data) => {
        let price:any  = 0;
        this.totalPrice = data.reduce((previous, current) => {
          price = previous.price
          price += current.price
          return price
        } )

      }
    )
  }

  deleteProduct(data: productModel) {
    if (window.confirm('Are you sure you want to remove this product from cart')) {
      console.log(data)
      this.myService.deleteProduct(data).subscribe(
        (data) => {      
          this.toastr.success('Product has been removed from the cart');
          window.location.reload()
        },
        (error) => this.toastr.error(error.error.message,'Unable to remove the product from cart')
      )
      }
  }

}
