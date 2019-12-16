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
  headers: HttpHeaders = new HttpHeaders();
  constructor(private readonly http: HttpClient, private readonly subscribeService: SubscribeService) {

    this.appendHeaders();
  }
  
  appendHeaders() {
    this.headers.append('Accept', 'application/json');
    this.headers.append('bar', 'test');
    this.headers.append('Content-Type', '*');
    this.headers.append('Access-Control-Allow-Origin', '*');
  }

  login(username: string, password: string): Observable<LoginResponseModel> {
    const model = {
      "email": username,
      "password":password,
      "rememberMe": false
    };
    return this.http.post<LoginResponseModel>('https://uaaecommerce20191205082947.azurewebsites.net/Account/LoginCliente', model);
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

  register(email: string, address: string,
           razonSocial: string, ruc:string, cityId: number, phone: string, password: string) {
    const model = {
      "Email": email,
      "Direccion": address,
      "RazonSocial": razonSocial,
      "Ruc": ruc,
      "Telefono": phone,
      "Password": password,
      "CiudadId": cityId
    };
    return this.http.post<SystemValidationModel>('https://uaaecommerce20191205082947.azurewebsites.net/Account/Register', model);
  }

  completeRegistration = (userId: number, email: string, address: string, document: string,
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

  updateProfile = (userId: number, email: string, address: string, document: string,
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
