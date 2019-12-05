import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../shared/services/login.service';
import {CurrentUserService} from '../../shared/services/current-user.service';
import {Observable} from 'rxjs';
import {UserCartService} from "../../shared/services/user-cart.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import { DEFAULT_CART_MODEL } from '../../models/cart.model';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, OnDestroy {

  constructor(private readonly router: Router,
              private readonly loginService: LoginService,
              private readonly currentUser: CurrentUserService,
              private readonly userCartService: UserCartService,
              private readonly snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userCartService.getCart();
  }

  ngOnDestroy() {
  }

  get isAuthenticated(): Observable<boolean> {
    return this.currentUser.isAuthenticated();
  }

  logout = () => { //  TODO: VERIFICAR AL HACER LOGOUT E INTENTAR AGREGAR COSAS AL CARRITO YA NO OBTIENE EL SESSION ID
    this.currentUser.setUser(null);
    this.userCartService.setCart(DEFAULT_CART_MODEL);
    this.loginService.logout();
    this.snackBar.open("La sesión se ha cerrado exitosamente!.", "Cerrar", {duration:1700});
    this.router.navigate(["/home"]);
  }
}
