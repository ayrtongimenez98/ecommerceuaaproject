import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { CurrentUserService } from '../../shared/services/current-user.service';
import { CartItemModel } from '../../models/cartItem.model';
import { SubscribeService } from '../../shared/services/subscribe.service';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {debounceTime, exhaustMap, tap} from 'rxjs/operators';
import { UserCartService } from '../../shared/services/user-cart.service';
import {SystemValidationModel} from "../../models/systemvalidation.model";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  cartForm: FormGroup;
  controlsSubscriptions: Array<Subscription> = [];
  onLogoutSubscription: Subscription;
  onMainPayButtonClick: Subscription;
  onCartChangeSubscription: Subscription;
  loading: boolean = false;


  constructor(private readonly userCartService: UserCartService,
              private readonly currentUserService: CurrentUserService,
              private readonly subscribeService: SubscribeService,
              private readonly formBuilder: FormBuilder,
              private readonly matSnackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.cartForm = this.formBuilder.group({
      coupon: this.formBuilder.control('', []),
      deliveryMethod: 'TAKEOUT',
      items: this.formBuilder.array([])
    });

    this.onCartChangeSubscription = this.userCartService.cart().subscribe(cart => {
      this.loading = true;
      this.clearItems();
      const items = (<FormArray>this.cartForm.get('items'));
      for (const cartItem of cart.Detalles) {
        const control = this.createItem(cartItem);
        items.push(control);
        const controlSubscription = control
          .valueChanges
          .pipe(
            debounceTime(600)
          )
          .subscribe(this.updateCartItem.bind(this));
        this.controlsSubscriptions.push(controlSubscription);
      }
      this.loading = false;
    });

    this.onLogoutSubscription = this.subscribeService.onLogout.subscribe(x => {
      if (!x) return;
      this.clearItems();
    });
  }

  ngOnDestroy(): void {
    this.clearItems();
    if (this.onLogoutSubscription) {
      this.onLogoutSubscription.unsubscribe();
    }
    if (this.onCartChangeSubscription) {
      this.onCartChangeSubscription.unsubscribe();
    }

    if (this.onMainPayButtonClick)
      this.onMainPayButtonClick.unsubscribe();
  }

  addItem(item: AbstractControl): void {
    const quantityControl = item.get('quantity');
    quantityControl.setValue(quantityControl.value + 1);
    item.get('subTotal').setValue(quantityControl.value * item.get('price').value);
  }

  subtractItem(item: AbstractControl): void {
    const quantityControl = item.get('quantity');
    if (quantityControl.value <= 1) return;
    quantityControl.setValue(quantityControl.value - 1);
    item.get('subTotal').setValue(quantityControl.value * item.get('price').value);
  }

  deleteItem(item: AbstractControl): void {
    const items = <FormArray>this.cartForm.get('items');
    const index = items.controls.findIndex(x => x == item);
    items.removeAt(index);
    this.userCartService.deleteItem(item.get('id').value);
  }

  checkoutSuccess(response: SystemValidationModel): void {
    if (response.Success) {
      window.open(response.Message, '_self');
    }
    else {
      this.matSnackBar.open(response.Message, "Cerrar", {duration:1500});
    }
  }

  checkoutError(err: any): void {
    console.error(err);
    this.matSnackBar.open(err, "Cerrar", {duration:1500});
  }

  updateCartItem(item: any): void {
    return this.userCartService.updateItem(item.productId, item.quantity);
  }

  get isAuthenticated(): Observable<boolean> {
    return this.currentUserService.isAuthenticated();
  }

  get discounts(): number {
    return 0;
  }

  get subTotal(): number {
    const items = this.cartForm.get('items') as FormArray;
    return items.controls.map(x => x.value.quantity * x.value.price).reduce((a, b) => a + b, 0);
  }

  get total(): number {
    return this.subTotal + this.deliveryTotal;
  }

  get deliveryTotal(): number {
    return this.cartForm.get('deliveryMethod').value == 'DELIVERY' ? 15000 : 0;
  }

  get cf(): { [key: string]: AbstractControl } {
    return this.cartForm.controls;
  }

  get isCartEmpty(): boolean {
    return (<FormArray>this.cartForm.get('items')).length < 1;
  }

  getControl(name: string): FormGroup {
    return this.cartForm.get(name) as FormGroup;
  }

  private clearItems(): void {
    this.unsubscribeFromControls();
    const items = <FormArray>this.cartForm.get('items');
    while (items.length !== 0) {
      items.removeAt(0);
    }
  }

  private unsubscribeFromControls(): void {
    for (let controlSubscription of this.controlsSubscriptions) {
      if (controlSubscription)
        controlSubscription.unsubscribe();
    }
  }

  private createItem(item: CartItemModel): FormGroup {
    return this.formBuilder.group({
      id: item.IdPedidoDetalle,
      name: item.Descripcion,
      productId: item.IdProducto,
      photo: item.Photo,
      quantity: item.Cantidad,
      price: item.Precio,
      subTotal: item.SubTotal
    });
  }

  mapClick() {
    window.open("https://goo.gl/maps/mVvswaqX7q1i7GCL7");
  };
}
