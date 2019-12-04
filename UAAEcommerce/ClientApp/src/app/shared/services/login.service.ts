import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginResponseModel} from "../../models/login-response.model";
import {SystemValidationModel} from "../../models/systemvalidation.model";
import {SubscribeService} from './subscribe.service';
import {UserModel} from "../../models/user.model";
import {map} from "rxjs/operators";

@Injectable()
export class LoginService {
  constructor(private readonly http: HttpClient, private readonly subscribeService: SubscribeService) {

  }

  login(username: string, password: string): Observable<LoginResponseModel> {
    const body = {
      username,
      password,
      rememberMe: false
    };
    return this.http.post<LoginResponseModel>('/api/authentication/login', body);
  }

  socialLogin(id: string): Observable<LoginResponseModel> {
    const body = {
      "id": id
    };
    return this.http.post<LoginResponseModel>('/api/authentication/sociallogin', body, {
      headers: new HttpHeaders({'id': id})
    });
  }

  socialLoginToken(AuthenticationToken: string): Observable<LoginResponseModel> {
    const body = {
      "AuthenticationToken": AuthenticationToken
    };
    return this.http.post<LoginResponseModel>('/api/authentication/sociallogin', body, {
      headers: new HttpHeaders({'AuthenticationToken': AuthenticationToken})
    });
  }

  register(firstName: string, lastName: string, email: string, address: string, document: string,
           razonSocial: string, ruc:string, city: string, date: string, phone: string, password: string) {
    const body = {
      firstName,
      lastName,
      email,
      address,
      document,
      razonSocial,
      ruc,
      city,
      date,
      phone,
      password
    };
    return this.http.post<SystemValidationModel>('/api/authentication/register', body);
  }

  completeRegistration = (userId: string, email: string, address: string, document: string,
                          razonSocial: string,
                          city: string,
                          date: string,
                          phone?: string,
                          ruc?:string,
                          newPassword?: string, password?:string, firstName?:string, lastName?:string, photo?: string) => {
    const body = {
      userId,
      email,
      address,
      document,
      razonSocial,
      city,
      date,
      phone,
      ruc,
      newPassword,
      password,
      firstName,
      lastName,
      photo
    };

    return this.http.post<LoginResponseModel>('/api/authentication/completeRegister', body);
  };

  updateProfile = (userId: string, email: string, address: string, document: string,
                          razonSocial: string,
                          city: string,
                          date: string,
                          phone?: string,
                          ruc?:string,
                          newPassword?: string, password?:string, firstName?:string, lastName?:string, photo?: string) => {
    const body = {
      userId,
      email,
      address,
      document,
      razonSocial,
      city,
      date,
      phone,
      ruc,
      newPassword,
      password,
      firstName,
      lastName,
      photo
    };

    return this.http.post<LoginResponseModel>('/api/authentication/updateProfile', body);
  };

  logout(): boolean {
    this.subscribeService.emitLogout(true);
    return true;
  }
}
