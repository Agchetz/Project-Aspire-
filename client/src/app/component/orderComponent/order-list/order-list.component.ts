import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { BaseService } from 'src/app/Shared/baseService';
import { orderDetailsModel, orderModel } from 'src/app/Shared/interface';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit, AfterViewInit {
 
  @Input() public dataSource!:orderModel[];
  @Input() public fullTableData!:orderDetailsModel[];
  @Input() public paginationSizes!:number[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = [];
  public columns!:string[];
  public data!: MatTableDataSource<Object>;
  private rows!: orderModel[];
  private temp!: orderDetailsModel[] ;

constructor(
  private myservice: BaseService, 
  private router: Router,
  private toastr: ToastrService
  ){}

   ngOnInit(){
     this.loadTableData()
    }

    ngAfterViewInit() {
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
    }

    loadTableData(){
      this.columns =  Object.keys(this.dataSource[0]);
      this.rows = this.dataSource;
      this.data = new MatTableDataSource<Object>(this.rows);
      this.displayedColumns = this.columns.concat(['Action']);
      this.temp = this.fullTableData;
    }

    updateOrder(row:orderModel) {
      let data:Number = this.temp[row.id - 1]._id
      this.myservice.behaviourSubject.next(this.temp[row.id - 1]);
      this.router.navigateByUrl('/order/update/' + data);
    }

    deleteOrder(row: orderModel) {
      if (window.confirm('Are you sure you want to delete this order')) {
        this.toastr.success('Deleted the order successfully');
        let data:Number = this.temp[row.id - 1]._id
        this.myservice.deleteorder(data).subscribe(
          (data) => {window.location.reload()},
          (error) => this.toastr.error(error.error.message,'Unable to delete an Order')
        )}
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.data.filter = filterValue.trim().toLowerCase();
      if (this.data.paginator) {
         this.data.paginator.firstPage();
      }
    }

}