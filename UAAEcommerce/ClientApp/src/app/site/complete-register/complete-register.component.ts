import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../shared/services/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CurrentUserService} from "../../shared/services/current-user.service";
import {SubscribeService} from "../../shared/services/subscribe.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-complete-register',
  templateUrl: './complete-register.component.html',
  styleUrls: ['./complete-register.component.css']
})
export class CompleteRegisterComponent implements OnInit {
  hide = true;
  process: boolean = false;
  registerForm: FormGroup;
  cartId: string = null;
  saveCartId: string = null;
  returnUrl: string;
  userId: number;
  constructor(private readonly loginService: LoginService, private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute,
              private readonly currentUser: CurrentUserService,
              private readonly subscribeService: SubscribeService,
              private readonly snackBar: MatSnackBar) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl(""),
      lastName: new FormControl(""),
      email: new FormControl(""),
      address: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      phone: new FormControl(""),
      ruc: new FormControl(""),
      date: new FormControl("", [Validators.required]),
      document: new FormControl("", [Validators.required]),
      razonSocial: new FormControl(""),
      passwords: new FormGroup({
        password: new FormControl("", [Validators.required, Validators.maxLength(6)]),
        rePassword: new FormControl("", [Validators.required])
      })
    });

    this.activatedRoute.params.subscribe(param => {
      if (param['id']) {
        this.loginService.socialLogin(param['id']).subscribe(x => {
          this.saveCartId = this.cartId;
          if (x.Succeeded) {
            this.userId = x.UserId;
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
            this.registerForm.patchValue({
              email: x.Username,
              address: "",
              firstName: x.FirstName,
              lastName: x.LastName,
              documento: x.Documento,
              ruc: x.Ruc,
              razonSocial: x.RazonSocial,
            });
            this.registerForm.controls['email'].disable();
            this.registerForm.controls['firstName'].disable();
            this.registerForm.controls['lastName'].disable();
            this.registerForm.updateValueAndValidity();
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
  updateUser() {
    const email = this.registerForm.get("email").value;
    const address = this.registerForm.get("address").value;
    const city = this.registerForm.get("city").value;
    const phone = this.registerForm.get("phone").value;
    const date = this.registerForm.get("date").value;
    const document = this.registerForm.get("document").value;
    const razonSocial = this.registerForm.get("razonSocial").value;
    const password = (this.registerForm.get('passwords') as FormGroup).get('password').value;
    const ruc = this.registerForm.get("ruc").value;
    this.loginService.completeRegistration(this.userId, email, address, document, razonSocial, city, date, phone, ruc, password).subscribe(x => {
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
          this.router.navigate([this.getRedirectUrl(x.Roles)]);
      } else {
        console.log(x.Message);
          this.process = false;
          console.log(x.Message);
          this.snackBar.open(x.Message);
      }
      this.subscribeService.emitLogin(x.Succeeded);
    });
  }
  private getRedirectUrl(roles: Array<string>): string {
    if (this.returnUrl != null) return this.returnUrl;
    const isAdmin = roles.indexOf("Admin") > -1;
    if (isAdmin)
      return "/admin";
    return "/shop";
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
  get rf() { return this.registerForm.controls; };
  get rfp() {
    return (<FormGroup>this.registerForm.get('passwords')).controls;
  }
}
