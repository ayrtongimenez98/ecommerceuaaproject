import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { CurrentUserService } from '../shared/services/current-user.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private readonly userService: CurrentUserService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const user = this.userService.userModel;
    if (user == null || user.token == null || user.expirationDate <= new Date() || user.roles.indexOf('Admin') < 0) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
