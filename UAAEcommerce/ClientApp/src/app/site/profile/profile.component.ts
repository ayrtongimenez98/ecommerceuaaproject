import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ChangeDetectorRef} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {UserService} from "../../shared/services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CurrentUserService} from "../../shared/services/current-user.service";
import {OrderService} from "../../shared/services/order.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {OrderModel} from "../../models/order.model";
import {LoginService} from "../../shared/services/login.service";
import {ValidationService} from "../../shared/services/validation.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  hide = true;
  mobileQuery: MediaQueryList;
  displayedColumns: string[] = ['date', 'cantItems', 'paymentMethod', 'total', 'status', 'hash'];
  dataSource = new MatTableDataSource(null);
  isProfileView: boolean = true;
  userForm: FormGroup;
  loading: boolean = false;
  orders: Array<OrderModel> = [];
  private userName: string = "";
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private readonly  userServices: UserService,
              private readonly snackBar: MatSnackBar, private readonly currentUser: CurrentUserService,
              private readonly orderServices: OrderService, private readonly loginService: LoginService,
              private readonly validationService: ValidationService,
              private readonly router: Router) {

    this.mobileQuery = media.matchMedia('(max-width: 1200px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.loading = true;
    this.currentUser.isAuthenticated().subscribe(x =>{
      if (!x)this.router.navigate(["/login"]);
    });
    this.userForm = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      phoneNumber: new FormControl(""),
      date: new FormControl("", [Validators.required]),
      documento: new FormControl("", [Validators.required]),
      razonSocial: new FormControl(""),
      password: new FormControl(""),
      newPasswords: new FormGroup({
        newPassword: new FormControl(""),
        reNewPassword: new FormControl("")
      }, [this.validationService.confirmPassword("newPassword", "reNewPassword")])
    });
    this.userServices.userProfile(this.currentUser.getUserId()).subscribe(x => {
      this.userName = x.username;
      this.userForm.patchValue({
        firstName: x.firstName,
        lastName: x.lastName,
        phoneNumber: x.phoneNumber,
        username: x.username,
        razonSocial: x.razonSocial,
        address: x.address,
        city: x.city,
        date: this.setDate(x.date),
        documento: x.documento
      });
      this.userForm.get("username").disable({onlySelf: true});
      this.userForm.updateValueAndValidity();
      this.loading = false;
    });
    this.orderServices.ordersByUser(this.currentUser.getUserId()).subscribe(x => {
      this.orders = x;
      this.dataSource = new MatTableDataSource(this.orders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    });
  }

  getUserView(isUserProfile: boolean) {
    this.isProfileView = isUserProfile;
  }

  updateUser() {
    this.loading = true;
    const firstName = this.userForm.get("firstName").value;
    const lastName = this.userForm.get("lastName").value;
    const email = this.userName;
    const address = this.userForm.get("address").value;
    const city = this.userForm.get("city").value;
    const phoneNumber = this.userForm.get("phoneNumber").value;
    const date = this.userForm.get("date").value;
    const document = this.userForm.get("documento").value;
    const razonSocial = this.userForm.get("razonSocial").value;
    const password = this.userForm.get('password').value;
    const ruc = "";
    const newPassword = (this.userForm.get('newPasswords') as FormGroup).get('newPassword').value;
    this.loginService.updateProfile(this.currentUser.getUserId(), email, address, document, razonSocial, city,
      date, phoneNumber, ruc, newPassword, password, firstName, lastName).subscribe(x => {
      if (x.succeeded) {
        this.loading = false;
        this.snackBar.open("Sus datos fueron actualizados exitosamente!.")
      } else {
        this.loading = false;
        console.log(x.message);
        this.snackBar.open(x.message);
      }
    });
  }
  setDate(date: string) {
    if (!date) return "";
    const currentDate = new Date(date);
    return currentDate.toISOString().substring(0, 10);
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
  goOrder(id: string) {
    this.router.navigate(['/order/' + id]);
  };
  get rf() {
    return this.userForm.controls;
  }
  get rfp() {
    return (<FormGroup>this.userForm.get('newPasswords')).controls;
  }
}
