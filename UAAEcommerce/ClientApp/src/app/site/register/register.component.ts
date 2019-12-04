import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../shared/services/login.service';
import { Router } from '@angular/router';
import {MatSnackBar} from "@angular/material";
import {ValidationService} from "../../shared/services/validation.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading:boolean=false;
  constructor(private readonly loginService: LoginService, private readonly router: Router,
              private readonly snackBar: MatSnackBar, private readonly validationService: ValidationService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      address: new FormControl(""),
      city: new FormControl("",),
      phone: new FormControl(""),
      date: new FormControl("", [Validators.required]),
      document: new FormControl("", [Validators.required]),
      razonSocial: new FormControl(""),
      ruc: new FormControl(""),
      passwords: new FormGroup({
        password: new FormControl("",[Validators.required, Validators.minLength(6)]),
        rePassword: new FormControl("", [Validators.required])
      }, [this.validationService.confirmPassword("password", "rePassword")])
    });
  }

  registerUser() {
    this.loading = true;
    const firstName = this.registerForm.get("firstName").value;
    const lastName = this.registerForm.get("lastName").value;
    const email = this.registerForm.get("email").value;
    const address = this.registerForm.get("address").value;
    const city = this.registerForm.get("city").value;
    const phone = this.registerForm.get("phone").value;
    const date = this.registerForm.get("date").value;
    const document = this.registerForm.get("document").value;
    const razonSocial = this.registerForm.get("razonSocial").value;
    const ruc = this.registerForm.get("ruc").value;
    const password = (this.registerForm.get('passwords') as FormGroup).get('password').value;
    this.loginService.register(firstName, lastName, email, address, document, razonSocial, ruc, city, date, phone, password).subscribe(x => {
      if (x.success) {
        this.loading = false;
        this.snackBar.open("Registro exitoso!", "Aceptar", {duration:5000});
        this.router.navigate(["/login"]);
      } else {
        this.loading = false;
        console.log(x.message);
        this.snackBar.open(x.message? "" : "Ocurrio un error.");
      }
    });
  }
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
  get rf() { return this.registerForm.controls; }
  get rfp() {
    return (<FormGroup>this.registerForm.get('passwords')).controls;
  }
}
