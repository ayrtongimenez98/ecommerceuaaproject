import { Injectable} from "@angular/core";
import { GraphQlService } from "./graphql.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SystemValidationModel } from "src/app/models/systemvalidation.model";
import { CouponModel } from "../../models/coupon.model";

@Injectable()
export class CouponService{

  constructor(private readonly http: HttpClient, private readonly graphql: GraphQlService) {

  }

  coupon(id: string): Observable<CouponModel> {
    const query = `query($id: ID!){
          coupon(id: $id){
              id
    					code
    					description
    					status
              percentage
              expirationDate
          }
      }`;
    return this.graphql.query(query, { id }).pipe(map(x => x.data['coupon'] as CouponModel));
  }

  coupons(): Observable<Array<CouponModel>> {
    const query = `{
      coupons {
        id
        code
        description
        status
        percentage
        expirationDate
      }
    }`;
    return this.graphql.query(query, null).pipe(map(x => x.data["coupons"] as Array<CouponModel>));
  }

  generateCoupons(quantity: number, description: string, percentage: number, expirationDate: string): Observable<SystemValidationModel> {
    const query = `mutation($quantity: Int!, $description: String!, $percentage: Int!, $expirationDate: DateTimeOffset!){
                      generateCoupons(quantity: $quantity, description: $description, percentage: $percentage, expirationDate: $expirationDate){
                        success
                        message
                      }
                    }`;
    const variables = {
      description,
      quantity,
      percentage,
      expirationDate
    };
    return this.graphql.query(query, variables).pipe(map(x => x.data["generateCoupons"] as SystemValidationModel));
  }

  delete(id: string): Observable<SystemValidationModel> {
    const query = `mutation($id: ID!){
                      deleteCoupon(id: $id){
                        success
                        message
                      }
                    }`;
    return this.graphql.query(query, {id}).pipe(map(x => x.data["deleteCoupon"] as SystemValidationModel));
  }
}
