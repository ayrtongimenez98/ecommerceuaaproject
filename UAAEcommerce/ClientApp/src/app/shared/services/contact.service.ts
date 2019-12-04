import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ContactModel } from "../../models/contact.model";

@Injectable()
export class ContactService {

  constructor(private readonly http: HttpClient) {

  }
  //sendMail(name: string, email: string, message: string): Observable<{ success: boolean, message: string }> {
  //  const headers = new HttpHeaders({
  //    "Authorization": `Bearer ${window.localStorage.getItem("token")}`
  //  });
  //  return this.http.post<{ success: boolean, message: string }>('/api/contact',
  //    { name, email, message },
  //    { headers: headers });
  //}

  sendMail(name: string, email: string, message: string): Observable<ContactModel> {
    const body = {
      name,
      email,
      message
    };
    return this.http.post<ContactModel>('/api/contact/sendmail', body);
  }
}
