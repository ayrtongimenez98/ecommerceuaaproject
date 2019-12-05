import {Injectable} from "@angular/core";
import {GraphQlService} from "./graphql.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {OrderModel} from "src/app/models/order.model";
import {SystemValidationModel} from "src/app/models/systemvalidation.model";
import {OrderDetailsModel} from "../../models/order-details.model";

@Injectable()
export class OrderService {
  constructor(private readonly graphql: GraphQlService) {

  }

  orders(): Observable<Array<OrderModel>> {
    const query = `{
        orders {
          id
          numeroPedido
          status
          date
          hash
          paymentMethod
          deliveryMethod
          total
          cantItems
          user{
            username
          }
        }
    }`;
    return this.graphql.query(query, null).pipe(map(x => x.data["orders"] as Array<OrderModel>));
  }

  ordersByUser(id: number): Observable<Array<OrderModel>> {
    const query = `query ($id: ID!) {
                    ordersByUser(id: $id) {
                      id
                      numeroPedido
                      status
                      date
                      hash
                      paymentMethod
                      deliveryMethod
                      total
                      cantItems
                    }
                  }`;
    return this.graphql.query(query, {id}).pipe(map(x => x.data["ordersByUser"] as Array<OrderModel>));
  }

  order(id: string): Observable<OrderModel> {
    const query = `query($id: ID!){
                            order(id: $id){
        id
        userId
    		status
        user{
          id
          firstName
          lastName
        }
        cart{
          id
          items{
            product{
              name
              description
              price
              photos{
                name
                images{
                  blobName
                  original
                }
              }
            }
            quantity
          }
        }
      }
    }`;
    return this.graphql.query(query, {id}).pipe(map(x => x.data['order'] as OrderModel));
  }

  details(hash: string): Observable<OrderDetailsModel> {
    const query = `query($hash: String!){
                      orderDetails(hash: $hash){
                        orderId
                        cancelado
                        fechaMaximoPago
                        fechaPago
                        hash
                        metodoPago
                        numeroPedido
                        pagado
                        status
                        items{
                          description
                          name
                          imageUrl
                          price
                          quantity
                          totalPrice
                          forGift
                        }
                      }
                    }`;
    const variables = {hash};
    return this.graphql.query(query, variables).pipe(map(x => x.data['orderDetails'] as OrderDetailsModel));
  }

  updateOrderDetails(hash: string): Observable<SystemValidationModel> {
    const query = `mutation($hash: String!){
                      updateOrderDetails(hash: $hash){
                        success
                        message
                      }
                    }`;
    const variables = {hash};
    return this.graphql.query(query, variables).pipe(map(x => x.data['updateOrderDetails'] as SystemValidationModel));
  }

}
