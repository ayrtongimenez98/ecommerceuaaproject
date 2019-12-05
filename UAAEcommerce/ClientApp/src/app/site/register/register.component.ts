import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../shared/services/login.service';
import { Router } from '@angular/router';
import {MatSnackBar} from "@angular/material";
import {CiudadService} from "../../shared/services/ciudad.service"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading:boolean=false;
  ciudades: Array<any>;
  constructor(private readonly loginService: LoginService, private readonly router: Router,
              private readonly snackBar: MatSnackBar, private readonly ciudadService: CiudadService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      address: new FormControl(""),
      cityId: new FormControl(0,),
      phone: new FormControl(""),
      razonSocial: new FormControl(""),
      ruc: new FormControl(""),
      passwords: new FormGroup({
        password: new FormControl("",[Validators.required, Validators.minLength(6)]),
        rePassword: new FormControl("", [Validators.required])
      })
    });
    this.ciudadService.findAll().subscribe(x => this.ciudades = x );
  }

  registerUser() {
    this.loading = true;
    const email = this.registerForm.get("email").value;
    const address = this.registerForm.get("address").value;
    const cityId = this.registerForm.get("cityId").value;
    const phone = this.registerForm.get("phone").value;
    const razonSocial = this.registerForm.get("razonSocial").value;
    const ruc = this.registerForm.get("ruc").value;
    const password = (this.registerForm.get('passwords') as FormGroup).get('password').value;
    this.loginService.register(email, address, razonSocial, ruc, cityId, phone, password).subscribe(x => {
      if (x.Success) {
        this.loading = false;
        this.snackBar.open("Registro exitoso!", "Aceptar", {duration:5000});
        this.router.navigate(["/login"]);
      } else {
        this.loading = false;
        console.log(x.Message);
        this.snackBar.open(x.Message? "" : "Ocurrio un error.");
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
