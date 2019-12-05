import {Component, OnInit, Inject} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {LoginService} from "../../shared/services/login.service";
import {Router, ActivatedRoute} from "@angular/router";
import {SubscribeService} from "../../shared/services/subscribe.service";
import {MatSnackBar} from '@angular/material';
import {CurrentUserService} from '../../shared/services/current-user.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  process: boolean = false;
  loading:boolean=false;
  userId: string = null;
  returnUrl: string;
  constructor(private readonly loginService: LoginService,
              private readonly router: Router,
              private readonly subscribeService: SubscribeService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly currentUser: CurrentUserService,
    private readonly snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.currentUser.isAuthenticated().subscribe(x =>{
      if (x)this.router.navigate(["/shop"]);
    });
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
    this.activatedRoute.queryParams.subscribe(x => {
      this.returnUrl = x['returnUrl'];
    });
  }
  login = () => {
    this.loading = true;
    const username: string = this.loginForm.get("username").value;
    const password: string = this.loginForm.get("password").value;
    this.loginService.login(username.toLowerCase(), password).subscribe(x => {
      if (x.Succeeded) {
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
        this.loading = false;
        this.router.navigate(['/shop']);
      } else {
        this.loading = false;
        console.log(x.Message);
        this.snackBar.open(x.Message);
      }
      this.subscribeService.emitLogin(x.Succeeded);
    });
  };

  socialSignIn(social: string) {
    this.process = true;
    console.log("submit login to facebook");
    window.location.href = "/account/SignInWith" + social;

  };
  mostrarPass = (id: string, iconId: string) => {
    const input = document.getElementById(id) as HTMLInputElement;
    const icon = document.getElementById(iconId) as HTMLImageElement;
    if (input.type == "text") {
      input.type = "password";
      icon.innerHTML = "visibility";
    } else {
      input.type = "text";
      icon.innerHTML = "visibility_off";
    }
  };

  get lf() {
    return this.loginForm.controls;
  }

  private getRedirectUrl(roles: Array<string>): string {
    if (this.returnUrl != null) return this.returnUrl;
    const isAdmin = roles.indexOf("Admin") > -1;
    if (isAdmin)
      return "/admin";
    return "/shop";
  }
}
