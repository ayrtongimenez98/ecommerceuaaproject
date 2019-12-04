import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { OrderModel } from 'src/app/models/order.model';
import { ActivatedRoute, Router } from '@angular/router';
import {OrderDetailsModel} from "../../models/order-details.model";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderId: string = null;
  total: number = 0;
  orderState: string;
  order: OrderDetailsModel = new OrderDetailsModel();
  loading:boolean = false;
  constructor(private readonly ordersService: OrderService, private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.activatedRoute.params.subscribe(param => {
      this.orderId = param['id'];
      this.ordersService.details(param['id']).subscribe(x => {
        this.order = x;
        this.sumarCarrito();
        this.orderState = x.cancelado ? 'Cancelado' : x.status;
        this.loading = false;
      });
    });

  }
  sumarCarrito = () => {
    this.total = 0;
    this.order.items.forEach(x => {
      this.total += x.quantity * x.price;
    });
  };


  deleteOrder(id: string): void {

  }
}
