import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CrudOperations } from './crud-operations.interface';
import { RequestOptions } from '@angular/http';
import { SystemValidationModel } from '../../models/systemvalidation.model';




export abstract class CrudService<T, ID> implements CrudOperations<T, ID> {
  headers: HttpHeaders = new HttpHeaders();
  
  constructor(
    protected _http: HttpClient,
    protected _base: string
  ) {
    this.appendHeaders();
  }
  
  appendHeaders() {
    this.headers.append('Accept', 'application/json');
    this.headers.append('bar', 'test');
    this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    this.headers.append('Allow', 'POST, GET, OPTIONS, DELETE, PUT');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
  }

  save(t: T): Observable<T> {
    return this._http.post<T>(this._base, t, {headers: this.headers});
  }

  update(id: ID, t: T): Observable<T> {
    return this._http.put<T>(this._base + "/" + id, t);
  }

  findOne(id: ID): Observable<T> {
    return this._http.get<T>(this._base + "/" + id, {headers: this.headers});
  }

  findAll(): Observable<T[]> {
    return this._http.get<T[]>(this._base, {headers: this.headers})
  }

  delete(id: ID): Observable<T> {
    return this._http.delete<T>(this._base + '/' + id, {headers: this.headers});
  }
  
  addItem(model: any): Observable<SystemValidationModel> {
    return this._http.post<SystemValidationModel>('https://localhost:44375/api/PedidoDetalles/AgregarDetalle', model);
  }

}