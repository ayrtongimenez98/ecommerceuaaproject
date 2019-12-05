import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {CartService} from './cart.service';
import {ProductModel} from '../../models/product.model';
import {CartItemModel} from "../../models/cartItem.model";
import {SystemValidationModel} from '../../models/systemvalidation.model';
import {UserService} from "./user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import { CartModel, DEFAULT_CART_MODEL } from '../../models/cart.model';
import { CartItemService } from './cart-item.service';
import { CurrentUserService } from './current-user.service';


@Injectable()
export class UserCartService implements OnDestroy {

  userCart: BehaviorSubject<CartModel>;
  cartId: BehaviorSubject<number>;

  constructor(private readonly cartService: CartService, private readonly cartItemService: CartItemService,private readonly userService: UserService,
              private readonly _snackBarService: MatSnackBar, private readonly currentUser: CurrentUserService) {
    this.userCart = new BehaviorSubject<CartModel>(DEFAULT_CART_MODEL);
    this.cartId = new BehaviorSubject<number>(0);
  }

  ngOnDestroy(): void {
    this.userCart.next(DEFAULT_CART_MODEL);
    this.userCart.complete();
    this.cartId.complete();
    this.cartId.next(null);
  }

  cart = (): Observable<CartModel> => this.userCart.asObservable();

  setCart(items: CartModel): void {
    this.userCart.next(items);
  }

  getCart(): void {
    if (this.cartId.getValue()) {
      this.cartService.findOne(this.cartId.getValue()).subscribe(cart => {
        if (cart == null) return;
        this.userCart.next(cart);
      });
    }
  }

  addItem(product: any, quantity: number): void {
    const cart = this.userCart.getValue();
    if (quantity < 1) return;
    const item: CartItemModel = {
      IdPedidoDetalle: 0,
      Cantidad: quantity,
      Descripcion: product.Descripcion,
      IdPedido: cart.IdPedido,
      IdProducto: product.IdProducto,
      Photo: product.Photo,
      SubTotal: product.Precio * quantity,
      Precio: product.Precio
    };
    cart.Detalles.push(item);
    var model = {
      IdPedido: cart.IdPedido,
      IdProducto: product.Id,
      IdCliente: JSON.parse(localStorage.getItem('user')).userId,
      Cantidad: quantity
    };
    this.cartItemService
      .update(model.IdPedido, model)
      .subscribe(response => {
        if (response.Success){
          this._snackBarService.open("Producto agregado al carrito.", "Aceptar", {duration:2000});
        } else{
          const index = cart.Detalles.findIndex(x => x === item);
          cart.Detalles.splice(index, 1);
          this._snackBarService.open("Ocurrio un error al agregar el producto al carrito.", "Aceptar", {duration:2000});
        }
        this.userCart.next(cart);
      });
  }

  updateItem(productId: number, quantity?: number): void {
    const cart = this.userCart.getValue();
    const cartItem = cart.Detalles.find(x => x.IdProducto === productId);
    if (cartItem == null) return;
    if (quantity < 1 && cartItem != null) {
      this.deleteItem(cartItem.IdPedidoDetalle);
      return;
    }
    const oldQuantity = parseInt(cartItem.Cantidad.toString());
    if (quantity)
      cartItem.Cantidad = quantity;

    var model = {
      IdPedido: cart.IdPedido,
      IdProducto: productId,
      IdCliente: this.currentUser.getUserId,
      Cantidad: quantity
    };
    this.cartItemService
      .addItem(model)
      .subscribe(response => {
        if (response.Success) {

          this._snackBarService.open("Producto actualizado en el carrito.", "Aceptar", {duration:2000});
        } else {
          console.error('Error updating cart item reverting values');
          this._snackBarService.open("Ocurrio un error al actualizar el carrito.", "Aceptar", {duration:2000});
          cartItem.Cantidad = oldQuantity;
          this.userCart.next(cart);
        }
      });
  }

  deleteItem(cartItemId: number): void {
    const cart = this.userCart.getValue();
    const index = cart.Detalles.findIndex(x => x.IdPedidoDetalle === cartItemId);
    if (index < 0) return;
    const removedValue = cart.Detalles.splice(index, 1)[0];
    this.cartService
      .delete(cartItemId)
      .subscribe(response => {
        if (response.success){

        } else {
          console.error('Error deleting cart item');
          cart.Detalles.splice(index, 0, removedValue);
          this.userCart.next(cart);
        }
      });
  }
}
