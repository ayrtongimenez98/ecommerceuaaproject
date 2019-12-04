import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DISABLED} from "@angular/forms/src/model";
import {ActivatedRoute, Router} from "@angular/router";
import {ValidationService} from "../../shared/services/validation.service";

@Component({
  selector: 'app-reset-account',
  templateUrl: './reset-account.component.html',
  styleUrls: ['./reset-account.component.css']
})
export class ResetAccountComponent implements OnInit {
  loading: boolean = false;
  resetForm: FormGroup;
  sendForm:FormGroup;
  userId: string;
  hidePass: boolean = false;
  tokenId: string;

  constructor(private readonly userService: UserService,
              private readonly snackBar: MatSnackBar,
              private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly validationService: ValidationService) {
  }

  ngOnInit() {
    this.resetForm = new FormGroup({
      passwords: new FormGroup({
        password: new FormControl("",[Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl("", [Validators.required])
      }, [this.validationService.confirmPassword("password", "confirmPassword")])
    });

    this.sendForm = new FormGroup({
      username: new FormControl("", [Validators.required, Validators.email])
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params["id"];
      this.tokenId = params["token"];
      this.hidePass = this.userId != null && this.tokenId != null;
    });
  }

  sendEmailForResetPass() {
    this.userService.resetPassByUserName(this.sendForm.value.username).subscribe(x => {
      if (x.success) {
        this.snackBar.open("Favor verifique su E-mail para resetear la contraseña.", "Aceptar", {duration: 5000});
        this.sendForm.patchValue({
          username: ''
        })
      }
    });
  }

  resetPassword(){
    const password= this.resetForm.value.passwords.password;
      this.userService.updateUserPass(this.userId, password, this.tokenId).subscribe(x => {
        if (x.success){
          this.snackBar.open(x.message, "Aceptar", {duration:5000});
          this.router.navigate(["/login"]);
        }else{
          this.snackBar.open(x.message, "Aceptar", {duration:5000});
        }
      });
  }
  get rf() {
    return this.resetForm.controls;
  }
  get rfp() {
    return (<FormGroup>this.resetForm.get('passwords')).controls;
  }
  get sf() {
    return this.sendForm.controls;
  }
}
