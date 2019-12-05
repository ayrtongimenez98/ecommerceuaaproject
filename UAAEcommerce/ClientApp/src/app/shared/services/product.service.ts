import {Injectable} from '@angular/core';
import {GraphQlService} from './graphql.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SystemValidationModel} from '../../models/systemvalidation.model';
import {CategoryModel} from "../../models/category.model";
import {SubCategoryModel} from "../../models/subcategory.model";
import {CartUpdateResponseModel} from "../../models/cart-update-response.model";
import {ProductUpdateResponseModel} from "../../models/product-update-response.model";
import {CrudService} from '../services/crud.service';

@Injectable()
export class ProductService extends CrudService<any, number>{

  constructor(protected _http: HttpClient) {
    super(_http, "https://localhost:44375/api/Producto");
  }
}
