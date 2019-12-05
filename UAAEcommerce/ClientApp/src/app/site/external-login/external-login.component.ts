import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {LoginService} from "../../shared/services/login.service";
import {Router, ActivatedRoute} from "@angular/router";
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
              private readonly router: Router,
              private readonly currentUser: CurrentUserService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      if (param['id']) {
        this.loginService.socialLogin(param['id']).subscribe(x => {
          this.saveCartId = this.cartId;
          if (x.Succeeded) {
            // window.localStorage.setItem("user", JSON.stringify(x));
            this.currentUser.setUser({
              email: x.Email,
              expirationDate: new Date(x.ExpirationDate),
              roles: x.Roles,
              token: x.Token,
              firstName: x.FirstName,
              lastName: x.LastName,
              succeeded: x.Succeeded,
              userId: x.UserId,
              documento: x.Documento,
              ruc: x.Ruc,
              razonSocial: x.RazonSocial,
              username: x.Username
            });
            this.router.navigate([this.getRedirectUrl(x.Roles)]);
          } else {
            console.log(x.Message);
          }
          this.process = false;
          this.subscribeService.emitLogin(x.Succeeded);
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
