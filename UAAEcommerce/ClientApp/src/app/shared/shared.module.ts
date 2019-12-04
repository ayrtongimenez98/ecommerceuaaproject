import { NgModule } from "@angular/core";
import { UserService } from "./services/user.service";
import { GraphQlService } from "./services/graphql.service";
import { SubscribeService } from "./services/subscribe.service";
import { ValidationService } from "./services/validation.service";
import { LoginService } from "./services/login.service";
import { HttpClientModule } from "@angular/common/http";
import { ContactService } from "./services/contact.service";
import { ResetService } from "./services/reset.service";
import { AdminGuard } from "../guards/admin.guard";
import { RolesService } from "./services/roles.service";
import { ProductService } from "./services/product.service";
import { CategoryService } from "./services/category.service";
import { CartService } from "./services/cart.service";
import { OrderService } from "./services/order.service";
import { CouponService } from "./services/coupon.service";
import { ReservasService } from "./services/reservas.service";
import {CurrentUserService} from './services/current-user.service';
import {SubCategoryService} from "./services/sub-category.service";
import {UserCartService} from './services/user-cart.service';


@NgModule({
  declarations: [

  ],
  exports: [

  ],
  imports: [
    HttpClientModule
  ],
  providers: [
    UserService,
    AdminGuard,
    GraphQlService,
    SubscribeService,
    UserService,
    ValidationService,
    LoginService,
    ContactService,
    ReservasService,
    ResetService,
    RolesService,
    ProductService,
    CategoryService,
    CartService,
    OrderService,
    CouponService,
    CurrentUserService,
    SubCategoryService
  ],
  bootstrap: []
})
export class SharedModule { }
