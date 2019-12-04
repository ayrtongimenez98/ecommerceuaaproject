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
  order: OrderDetailsModel = new OrderDetailsModel();
  orderState: string;
  hash: string = null;
  loading:boolean = false;
  constructor(private readonly ordersService: OrderService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.activatedRoute.params.subscribe(param => {
      this.hash = param['hash'];
      this.ordersService.details(this.hash).subscribe(x => {
        this.order = x;
        this.orderState = x.cancelado ? 'Cancelado' : x.status;
        this.loading = false;
      });
    });

  }
  get total(): number {
    return this.order.items.map(x => x.totalPrice).reduce((a,b) => a + b, 0);
  }

  scrollToSection(id) {
    let element = document.getElementById(id);
    element.scrollIntoView();
  }
}
