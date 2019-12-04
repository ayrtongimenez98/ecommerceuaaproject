import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {LoginService} from "../../shared/services/login.service";
import {Router, ActivatedRoute} from "@angular/router";
import {ValidationService} from "../../shared/services/validation.service";
import {CartService} from "src/app/shared/services/cart.service";
import {CurrentUserService} from "../../shared/services/current-user.service";
import {SubscribeService} from "../../shared/services/subscribe.service";

@Component({
  selector: 'app-external-login',
  templateUrl: './external-login.component.html',
  styleUrls: ['./external-login.component.css']
})
export class ExternalLoginComponent implements OnInit {
  process: boolean = true;
  cartId: string = null;
  saveCartId: string = null;
  userId: string = null;
  returnUrl: string;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly loginService: LoginService,
              private readonly subscribeService: SubscribeService,
              private readonly validationService: ValidationService,
              private readonly router: Router,
              private readonly currentUser: CurrentUserService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      if (param['id']) {
        this.loginService.socialLogin(param['id']).subscribe(x => {
          this.saveCartId = this.cartId;
          if (x.succeeded) {
            // window.localStorage.setItem("user", JSON.stringify(x));
            this.currentUser.setUser({
              email: x.email,
              expirationDate: new Date(x.expirationDate),
              roles: x.roles,
              token: x.token,
              firstName: x.firstName,
              lastName: x.lastName,
              succeeded: x.succeeded,
              userId: x.userId,
              documento: x.documento,
              ruc: x.ruc,
              razonSocial: x.razonSocial,
              username: x.username
            });
            this.router.navigate([this.getRedirectUrl(x.roles)]);
          } else {
            console.log(x.message);
          }
          this.process = false;
          this.subscribeService.emitLogin(x.succeeded);
        });
      }
    });
    this.activatedRoute.queryParams.subscribe(x => {
      this.returnUrl = x['returnUrl'];
    });
  }

  private getRedirectUrl(roles: Array<string>): string {
    if (this.returnUrl != null) return this.returnUrl;
    const isAdmin = roles.indexOf("Admin") > -1;
    if (isAdmin)
      return "/admin";
    return "/shop";
  }
}
