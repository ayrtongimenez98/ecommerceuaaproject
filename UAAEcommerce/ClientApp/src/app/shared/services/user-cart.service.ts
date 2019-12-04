import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {CartService} from './cart.service';
import {ProductModel} from '../../models/product.model';
import {CartItemModel} from "../../models/cartItem.model";
import {SystemValidationModel} from '../../models/systemvalidation.model';
import {UserService} from "./user.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Injectable()
export class UserCartService implements OnDestroy {

  userCart: BehaviorSubject<Array<CartItemModel>>;

  constructor(private readonly cartService: CartService, private readonly userService: UserService,
              private readonly _snackBarService: MatSnackBar) {
    this.userCart = new BehaviorSubject<Array<CartItemModel>>([]);
  }

  ngOnDestroy(): void {
    this.userCart.next(null);
    this.userCart.complete();
  }

  cart = (): Observable<Array<CartItemModel>> => this.userCart.asObservable();

  setCart(items: Array<CartItemModel>): void {
    this.userCart.next(items);
  }

  getCart(): void {
    this.cartService.getActiveCart().subscribe(cart => {
      if (cart == null) return;
      this.userCart.next(cart);
    });
  }

  addItem(product: ProductModel, quantity: number): void {
    const items = this.userCart.getValue();
    if (quantity < 1) return;
    const item: CartItemModel = {
      id: null,
      productId: product.id,
      product: product,
      quantity: quantity,
      forGift: false
    };
    items.push(item);
    this.cartService
      .addCartItem(product.id, quantity, false)
      .subscribe(response => {
        if (response.success){
          item.id = response.cartItemId;
          this._snackBarService.open("Producto agregado al carrito.", "Aceptar", {duration:2000});
        } else{
          const index = items.findIndex(x => x === item);
          items.splice(index, 1);
          this._snackBarService.open("Ocurrio un error al agregar el producto al carrito.", "Aceptar", {duration:2000});
        }
        this.userCart.next(items);
      });
  }

  updateItem(productId: string, quantity?: number, forGift?: boolean): void {
    const items = this.userCart.getValue();
    const cartItem = items.find(x => x.productId === productId);
    if (cartItem == null) return;
    if (quantity < 1 && cartItem.id != null) {
      this.deleteItem(cartItem.id);
      return;
    }
    const oldQuantity = parseInt(cartItem.quantity.toString());
    const oldForGift = JSON.parse(JSON.stringify(cartItem.forGift));
    if (quantity)
      cartItem.quantity = quantity;
    if (forGift)
      cartItem.forGift = forGift;
    this.cartService
      .addCartItem(productId, cartItem.quantity, cartItem.forGift)
      .subscribe(response => {
        if (response.success) {
          if (cartItem.quantity !== response.quantity){
            console.warn('cartItem quantity and response quantity do not match');
          }
          this._snackBarService.open("Producto actualizado en el carrito.", "Aceptar", {duration:2000});
        } else {
          console.error('Error updating cart item reverting values');
          this._snackBarService.open("Ocurrio un error al actualizar el carrito.", "Aceptar", {duration:2000});
          cartItem.quantity = oldQuantity;
          cartItem.forGift = oldForGift;
          this.userCart.next(items);
        }
      });
  }

  deleteItem(cartItemId: string): void {
    const items = this.userCart.getValue();
    const index = items.findIndex(x => x.id === cartItemId);
    if (index < 0) return;
    const removedValue = items.splice(index, 1)[0];
    this.cartService
      .deleteCartItem(cartItemId)
      .subscribe(response => {
        if (response.success){

        } else {
          console.error('Error deleting cart item');
          items.splice(index, 0, removedValue);
          this.userCart.next(items);
        }
      });
  }
  checkout(deliveryMethod: 'TAKEOUT' | 'DELIVERY', coupon: string): Observable<SystemValidationModel> {
    return this.cartService.processCheckout(deliveryMethod, coupon);
  }
}
