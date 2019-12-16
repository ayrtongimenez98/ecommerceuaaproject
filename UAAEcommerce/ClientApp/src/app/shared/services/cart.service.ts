import {Injectable} from "@angular/core";
import { GraphQlService } from "./graphql.service";
import {Observable } from "rxjs";
import { map } from "rxjs/operators";
import {CartUpdateResponseModel} from '../../models/cart-update-response.model';
import {CartItemModel} from "../../models/cartItem.model";
import { HttpClient } from "@angular/common/http";
import { CrudService } from "./crud.service";

@Injectable()
export class CartService extends CrudService<any, number> {

  constructor(protected _http: HttpClient) {
    super(_http, "https://uaaecommerce20191205082947.azurewebsites.net/api/Pedidos");
  }
}
