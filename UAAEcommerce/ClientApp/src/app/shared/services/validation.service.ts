import { Injectable, OnDestroy } from "@angular/core";
import { ValidatorFn, Validators, AbstractControl, ValidationErrors, AsyncValidatorFn } from "@angular/forms";
import { Subject } from "rxjs"
import { map } from "rxjs/operators"
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {GraphQlService} from './graphql.service';
import {SystemValidationModel} from '../../models/systemvalidation.model';

@Injectable()
export class ValidationService implements OnDestroy {

  constructor(private readonly graphql: GraphQlService) {

  }

  ngOnDestroy(): void {
  }

  get url(): ValidatorFn {
    return Validators.pattern("(https?://)?([\\da-zA-Z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?");
  }

  get phoneNumber(): ValidatorFn {
    return Validators.pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
  }

  confirmPassword(password: string, rePassword: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.get(password).value !== control.get(rePassword).value) {
        return { confirmPassword: true };
      }
      return null;
    };
  }

  repeatedUsername(userId: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const username = control.value;
      if ((username).length < 4) return null;
      const email = control.value;
      const query = `query($userId: String!, $userName: String!) {
        validateUserName(userId: $userId, userName: $userName): Boolean!
      }`;
      return this.graphql.query(query, {userId, email}).pipe(map(x => ({ userName: !x.data["validateUserName"]})))
    };
  }

  coupon(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const code = control.value as string;
      if (code == null || code == '' || code.length < 5) return Observable.create(null);
      const query = `query($code: String!) {
        validateCoupon(code: $code){
          success
        }
      }`;
      return this.graphql
        .query(query, {code})
        .pipe(
          map(x => {
            const valid = (<SystemValidationModel>x.data['validateCoupon']).success;
            if (valid) return null;
            return { coupon: !valid };
          })
        );
    }
  }

  repeatedEmail(userId: string): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      const email = control.value;
      return null;
    };
  }

  repeatedRol(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      const rol = control.value;
      return null;
    };
  }
}
