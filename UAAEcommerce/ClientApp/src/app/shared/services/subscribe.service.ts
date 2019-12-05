import { Injectable, OnDestroy } from "@angular/core";
import { Subject, Observable, fromEvent } from "rxjs";
import {ProductModel} from '../../models/product.model';
import {ICartItemAddModel} from '../../models/cart-item-add.model';

@Injectable()
export class SubscribeService implements OnDestroy {

  onOpenContactModal: Subject<boolean> = new Subject();
  onOpenMapModal: Subject<boolean> = new Subject();
  onToggleNavbar: Subject<boolean> = new Subject();
  onLogin: Subject<boolean> = new Subject();
  onLogout: Subject<boolean> = new Subject();
  private _onLocalStorage: Observable<StorageEvent> = fromEvent<StorageEvent>(window, 'storage');
  constructor() {

  }

  ngOnDestroy() {
    this.onOpenContactModal.next();
    this.onOpenContactModal.complete();

    this.onOpenMapModal.next();
    this.onOpenMapModal.complete();

    this.onToggleNavbar.next();
    this.onToggleNavbar.complete();

    this.onLogin.next();
    this.onLogin.complete();

    this.onLogout.next();
    this.onLogout.complete();
  }

  emitContactOpenModal(toggle: boolean): void {
    this.onOpenContactModal.next(toggle);
  }

  onLocalStorage(): Observable<StorageEvent> {
    return this._onLocalStorage;
  }
  
  emitMapOpenModal(toggle: boolean): void {
    this.onOpenMapModal.next(toggle);
  }

  emitToggleNavbar(toggle: boolean): void {
    this.onToggleNavbar.next(toggle);
  }

  emitLogin(successful: boolean): void {
    this.onLogin.next(successful);
  }

  emitLogout(successful: boolean): void {
    this.onLogout.next(successful);
  }
}
