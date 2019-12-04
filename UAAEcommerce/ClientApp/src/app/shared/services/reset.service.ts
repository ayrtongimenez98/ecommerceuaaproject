import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { SystemValidationModel } from "../../models/systemvalidation.model";

@Injectable()
export class ResetService {
  constructor(private readonly http: HttpClient) {

  }

  reset(email: string): Observable<{message: string, status: boolean}> {
    const body = {
      email
    };
    return this.http.post<{ message: string, status: boolean }>('/api/authentication/reset', body);
  }

  resetPassword(Password: string, Token: string, Userid: string): Observable<SystemValidationModel> {
    const body = {
      Password,
      Token,
      Userid
    }
    return this.http.post<SystemValidationModel>('/api/authentication/resetpassword', body);
  }

}
