import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { Router } from '@angular/router';
import {MatTableDataSource, MatPaginator, MatSort} from "@angular/material";
import {OrderModel} from "../../models/order.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Array<OrderModel> = [];
  total: number = 0;
  orderState: string;
  loading:boolean = false;
  displayedColumns: string[] = ['numeroPedido', 'username', 'date', 'cantItems', 'paymentMethod', 'total', 'status', 'hash'];
  dataSource = new MatTableDataSource(null);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private readonly orderService: OrderService, private readonly router: Router,
              private readonly snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loading = true;
    this.orderService.orders().subscribe(x => {
      this.orders = x;
      this.dataSource = new MatTableDataSource(this.orders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    });
  }
  goOrder(id: string) {
    this.router.navigate(['/admin/order/' + id]);
  }
  updateOrderDetails(hash:string){
    this.loading = true;
      this.orderService.updateOrderDetails(hash).subscribe(x=> {
        if (x.success){
          this.orderService.orders().subscribe(x =>{
            this.orders = x;
            this.dataSource.data = this.orders;
            this.loading = false;
          });
        }else{
          this.loading = false;
          this.snackBar.open(x.message, "Ok", {duration:800});
        }
      });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
