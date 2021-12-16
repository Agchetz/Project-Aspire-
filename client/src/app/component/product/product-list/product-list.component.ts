import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseService } from 'src/app/Shared/baseService';
import { orderDetailsModel, productModel } from 'src/app/Shared/interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {

  fullTableData!: orderDetailsModel[];
  tabledata!: any;
  cartItems: productModel[] = []
  image: any;


  constructor(private myService: BaseService, private toastr: ToastrService) {}

  ngOnInit() {
    this.loadProductData();
  }

  public loadProductData() {
    this.myService.getProduct().subscribe(
      (data) => {
        this.getProduct(data);
      },
      (error) => {
        this.toastr.error(error.error.message, 'Unable to fetch data');
      }
    );
  }

  getProduct(data: orderDetailsModel[]) {
    this.fullTableData = data;
    this.tabledata = data.map((element: orderDetailsModel, index: number) => {
      return {
        id: 1,
        product: element.product,
        department: element.department,
        quantity: element.quantity,
        price: element.price,
        user_id: element.user_id,
        image: (element.image)
      };
    });
  }

  addToCart(data: productModel) {
    const productExistInCart = this.cartItems.find(
          ({ product }) => product === data.product
        );
        this.cartItems.push(data)
        if (!productExistInCart){
      this.myService.addToCart(data).subscribe(
        (data) => {
            this.toastr.success('Order added to the list successfully');
        },
        (error) => this.toastr.error(error.error.message,' Adding order failed')
      )}else{
        data.id += 1
        let price:any = data.price
        data.price += price 
        this.myService.updateCart(data).subscribe(
          (data) => {
              this.toastr.success('Order added to the list successfully');
          },
          (error) => this.toastr.error(error.error.message,' Adding order failed')
        )
      }
    }


}
