import {Injectable} from "@angular/core";
import { GraphQlService } from "./graphql.service";
import {Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SystemValidationModel } from "src/app/models/systemvalidation.model";
import {CartUpdateResponseModel} from '../../models/cart-update-response.model';
import {CartItemModel} from "../../models/cartItem.model";

@Injectable()
export class CartService {

  constructor(private readonly graphql: GraphQlService) {

  }

  addCartItem(productId: string, quantity: number, forGift: boolean): Observable<CartUpdateResponseModel> {
    const query = `mutation($productId: String!, $quantity: Int!, $forGift: Boolean!){
      addCartItem(productId: $productId, quantity: $quantity, forGift: $forGift) {
        success
        quantity
        productId
        cartItemId
      }
    }`;
    const variables = {
      productId,
      quantity,
      forGift
    };
    return this.graphql.query(query, variables).pipe(map(x => x.data['addCartItem'] as CartUpdateResponseModel));
  }

  deleteCartItem(cartItemId: string): Observable<CartUpdateResponseModel> {
    const query = `mutation($cartItemId: String!) {
                    deleteCartItem(cartItemId: $cartItemId) {
                      success
                      quantity
                      productId
                      cartItemId
                    }
                  }`;
    return this.graphql.query(query, { cartItemId }).pipe(map(x => x.data["deleteCartItem"] as CartUpdateResponseModel));
  }

  processCheckout(deliveryMethod: 'TAKEOUT' | 'DELIVERY', coupon: string): Observable<SystemValidationModel> {
    const query = `mutation($deliveryMethod: DeliveryMethodEnum!, $coupon: String){
                      checkoutProcess(deliveryMethod: $deliveryMethod, coupon: $coupon){
                        success
                        message
                      }
                    }`;
    const variables = {
      deliveryMethod,
      coupon
    };
    return this.graphql.query(query, variables).pipe(map(x => x.data["checkoutProcess"] as SystemValidationModel));
  }

  getActiveCart(): Observable<Array<CartItemModel>> {
      const query = `{
        userCart {
          id
          productId
          quantity
          forGift
          product{
            id
            name
            description
            price
            photos {
              name
              main
              images {
                url
                original
              }
            }
          }
        }
      }`;
      return this.graphql.query(query, null).pipe(map(x => x.data['userCart'] as Array<CartItemModel>));
  }
}
