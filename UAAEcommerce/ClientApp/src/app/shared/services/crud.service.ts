import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CrudOperations } from './crud-operations.interface';
import { RequestOptions } from '@angular/http';




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
    this.headers.append('Content-Type', '*');
    this.headers.append('Access-Control-Allow-Origin', '*');
  }

  save(t: T): Observable<T> {
    return this._http.post<T>(this._base, t, {headers: this.headers});
  }

  update(id: ID, t: T): Observable<T> {
    return this._http.put<T>(this._base + "/" + id, t, {headers: this.headers});
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

}