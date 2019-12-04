import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ReservasModel } from "../../models/reservas.model";

@Injectable()
export class ReservasService {

  constructor(private readonly http: HttpClient) {

  }

  sendReservation(name: string, email: string, fecha: string, cantComensales: number, cel: string): Observable<ReservasModel> {
    const booking = {
      name,
      email,
      fecha,
      cantComensales,
      cel
    };
    return this.http.post<ReservasModel>('/api/reservas/sendreservation', booking);
  }
}

