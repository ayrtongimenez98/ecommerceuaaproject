import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CrudService } from "./crud.service";

@Injectable()
export class CartItemService extends CrudService<any, number> {

  constructor(protected _http: HttpClient) {
    super(_http, "https://uaaecommerce20191205082947.azurewebsites.net/api/PedidoDetalles");
  }
}