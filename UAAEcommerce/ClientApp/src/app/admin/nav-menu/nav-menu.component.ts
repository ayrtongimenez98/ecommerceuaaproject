import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, Event, ActivatedRoute} from '@angular/router';
import {LoginService} from "../../shared/services/login.service";
import {Observable} from "rxjs";
import {CurrentUserService} from "../../shared/services/current-user.service";

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, OnDestroy {
  isExpanded = false;

  constructor(private readonly router: Router, private readonly loginService: LoginService,
              private readonly currentUser: CurrentUserService) {

  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.currentUser.setUser(null);
    this.loginService.logout();
    this.isAuthenticated.subscribe(x => {
      if(!x.valueOf())
        this.router.navigate(["/home"]);
    })
  }

  get isAuthenticated(): Observable<boolean> {
    return this.currentUser.isAuthenticated();
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }
}
