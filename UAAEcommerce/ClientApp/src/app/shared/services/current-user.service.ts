import {Injectable} from '@angular/core';
import {UserTokenModel} from '../../models/user-token.model';
import {Observable, BehaviorSubject, of} from 'rxjs';

@Injectable()
export class CurrentUserService {

  private userSubject: BehaviorSubject<UserTokenModel>;

  constructor() {
    const user = JSON.parse(window.localStorage.getItem('user') || 'null');
    this.userSubject = new BehaviorSubject<UserTokenModel>(user);
  }

  user = (): Observable<UserTokenModel> => this.userSubject.asObservable();

  get userModel(): UserTokenModel {
    return this.userSubject.getValue();
  }

  setUser(user: UserTokenModel): void {
    window.localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  isAuthenticated(): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
      this.user().subscribe(user => {
        if (user == null) {
          subscriber.next(false);
          subscriber.complete();
          return;
        }
        subscriber.next(user.token != null && new Date(user.expirationDate) > new Date());
        subscriber.complete();
      })
    });
  }

  getUserId(): string{
    return this.userModel.userId;
  }
}
