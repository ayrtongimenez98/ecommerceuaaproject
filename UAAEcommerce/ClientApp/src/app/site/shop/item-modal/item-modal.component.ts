import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';
import {ProductModel} from '../../../models/product.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {debounceTime, tap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {UserCartService} from '../../../shared/services/user-cart.service';

@Component({
  selector: 'app-shop-item-modal',
  templateUrl: 'item-modal.component.html',
  styleUrls: ['item-modal.component.css']
})
export class ItemModalComponent implements OnInit, OnDestroy {

  product: ProductModel = null;
  quantity: number = 1;
  forGift: boolean;

  shopItemForm: FormGroup;

  quantityValueChangesSubscription: Subscription;

  constructor(private _bottomSheetRef: MatBottomSheetRef<ItemModalComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
              private readonly userCartService: UserCartService) {
    this.product = data.product;
    this.quantity = data.quantity;
    this.forGift = data.forGift;
  }


  ngOnInit() {
    this.shopItemForm = new FormGroup({
      quantity: new FormControl({ value:this.quantity, disabled: true }, [Validators.min(0), Validators.max(99)])
    });

    this.quantityValueChangesSubscription = this.shopItemForm
      .get('quantity')
      .valueChanges
      .pipe(
        tap(x => this.quantity = x),
        debounceTime(600)
      )
      .subscribe(this.updateCart);
  }

  ngOnDestroy(): void {
    if (this.quantityValueChangesSubscription) { this.quantityValueChangesSubscription.unsubscribe(); }
  }

  closeSheet() {
    this._bottomSheetRef.dismiss();
  }

  add = () => {
    this.shopItemForm.patchValue({
      quantity: <number>this.shopItemForm.get('quantity').value + 1
    });
  };

  subtract = () => {
    const quantity = <number>this.shopItemForm.get('quantity').value;
    if (quantity <= 1) return;
    this.shopItemForm.patchValue({
      quantity: quantity - 1
    });
  };

  updateCart = (quantity: number) => {
    this.userCartService.updateItem(this.product.id, quantity);
  };

  get totalPrice(): number {
    return this.product.price * this.quantity;
  }
}
