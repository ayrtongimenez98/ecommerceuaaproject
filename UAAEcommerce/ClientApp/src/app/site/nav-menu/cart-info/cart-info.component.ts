import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {SubscribeService} from '../../../shared/services/subscribe.service';
import {UserCartService} from '../../../shared/services/user-cart.service';
import {CartItemModel} from "../../../models/cartItem.model";

@Component({
  selector: 'app-cart-info',
  templateUrl: './cart-info.component.html',
  styleUrls: ['./cart-info.component.css']
})
export class CartInfoComponent implements OnInit, OnDestroy {

  cartItems: Array<CartItemModel> = [];
  loading: boolean = false;

  cartSubscription: Subscription;
  onLoginSubscription: Subscription;
  onLogoutSubscription: Subscription;

  constructor(private readonly userCartService: UserCartService,
              private readonly subscribeService: SubscribeService) {
  }

  ngOnInit() {
    this.cartSubscription = this.userCartService.cart().subscribe(x => {
      this.cartItems = x;
    });

    this.onLoginSubscription = this.subscribeService.onLogin.subscribe(successful => {
      if (!successful) return;
      this.userCartService.getCart();
    });

    // this.onLogoutSubscription = this.subscribeService.onLogout.subscribe(successful => {
    //   if (!successful) return;
    //   this.userCartService.setCart([]);
    // });
  }

  ngOnDestroy() {
    if (this.cartSubscription) { this.cartSubscription.unsubscribe(); }
    if (this.onLoginSubscription) { this.onLoginSubscription.unsubscribe(); }
    if (this.onLogoutSubscription) { this.onLogoutSubscription.unsubscribe(); }
  }

  get price(): number {
    return this.cartItems.map(x => x.quantity * x.product.price).reduce((a, b, i) => a + b, 0);
  }

  get quantity(): number {
    return this.cartItems.map(x => x.quantity).reduce((a, b, i) => a + b, 0)
  }
}
