import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseService } from 'src/app/Shared/baseService';
import { orderDetailsModel, orderModel } from 'src/app/Shared/interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  fullTableData!: orderDetailsModel[];
  tabledata!: orderModel[];
  cardDetails!: orderModel[];

  constructor(private myService: BaseService, private toastr: ToastrService) {}

  ngOnInit() {
    this.loadProductData();
  }

  public loadProductData() {
    this.myService.getOrder().subscribe(
      (data) => {
        this.getData(data);
      },
      (error) => {
        this.toastr.error(error.error.message, 'Unable to fetch data');
      }
    );
  }

  getData(data: orderDetailsModel[]) {
    this.fullTableData = data;
    this.tabledata = data.map((element: orderDetailsModel, index: number) => {
      return {
        id: index + 1,
        product: element.product,
        department: element.department,
        quantity: element.quantity,
        price: element.price,
        stock: element.stock,
        address: element.address,
      };
    });
  }

}
