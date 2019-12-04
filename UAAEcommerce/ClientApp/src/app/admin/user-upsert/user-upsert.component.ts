import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ValidationService } from '../../shared/services/validation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { RoleModel } from '../../models/role.model';
import { RolesService } from '../../shared/services/roles.service';

@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrls: ['./user-upsert.component.css']
})
export class UserUpsertComponent implements OnInit {

  userId: string;
  userForm: FormGroup;
  process: boolean = false;
  roles: Array<RoleModel> = [];

  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly usersService: UserService,
    private readonly validationService: ValidationService,
    private readonly rolesService: RolesService) { }

  ngOnInit() {
    this.process = true;
    this.userForm = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      cellphone: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required, Validators.minLength(3)], []),
      email: new FormControl("", [Validators.required, Validators.email], []),
      roles: new FormControl([], [Validators.required]),
      passwords: new FormGroup({
        password: new FormControl(""),
        rePassword: new FormControl("")
      }, [this.validationService.confirmPassword("password", "rePassword")])
    });

    this.activatedRoute.params.subscribe(params => {
      this.userId = params["id"];
      if (this.userId != null) {
        this.usersService.user(this.userId).subscribe(x => {
          this.userForm.patchValue({
            firstName: x.firstName,
            lastName: x.lastName,
            cellphone: x.phoneNumber,
            username: x.username,
            email: x.username,
            roles: x.roles
          });
          this.userForm.get('username').setAsyncValidators(this.validationService.repeatedUsername(x.id)); //TODO: cambiar para que se ejecute desde el evento focustLost del componente
          this.process = false;
        });
      } else {
        this.userForm.get('username').setAsyncValidators(this.validationService.repeatedUsername(null)); //TODO: cambiar para que se ejecute desde el evento focustLost del componente
        this.process = false;
      }
    });

    this.rolesService.roles().subscribe(x => {
      this.roles = x;
    });
  }

  upsertUser = () => {
    this.process = true;
    const email = this.userForm.get('username').value;
    const firstName = this.userForm.get('firstName').value;
    const lastName = this.userForm.get('lastName').value;
    const cellphone = this.userForm.get('cellphone').value;
    const username = this.userForm.get('username').value;
    const password = (this.userForm.get('passwords') as FormGroup).get('password').value;
    const roles: Array<string> = this.userForm.get('roles').value;
    if (this.userId == null) {
      this.usersService.createUser(email, username.toLowerCase(), cellphone, firstName, lastName, roles, password, null).subscribe(x => {
        this.process = false;
        this.router.navigate(['/admin/user']);
        // this.validationService.snackbar('Usuario agregado exitosamente');
      });
    } else {
      this.usersService.updateUser(this.userId, email, username.toLowerCase(), cellphone, firstName, lastName,  roles, password, null).subscribe(x => {
        this.process = false;
        this.router.navigate(['/admin/user']);
        // this.validationService.snackbar('Usuario editado exitosamente');
      });
    }
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
  back = () => {
    this.router.navigate(["/admin/user"]);
  };

  get uf() { return this.userForm.controls; }
}
