import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CurrentUserService } from './current-user.service';

@Injectable()
export class GraphQlService {

  constructor(private readonly http: HttpClient, private readonly currentUser: CurrentUserService) {

  }

  query(query: string, variables: Object, operationName?: string, namedQuery?: string): Observable<{ data: any }> {
    const body = {
      operationName,
      namedQuery,
      query,
      variables
    };
    const user = this.currentUser.userModel;
    let headers = new HttpHeaders();
    if (user != null && user.token != null) {
      headers = headers.append("Authorization", `Bearer ${user.token}`)
    }
    return this.http.post<{ data: any }>('/api/graph', body, { headers: headers });
  }
}
