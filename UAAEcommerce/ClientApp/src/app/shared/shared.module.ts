import { NgModule } from "@angular/core";
import { UserService } from "./services/user.service";
import { GraphQlService } from "./services/graphql.service";
import { SubscribeService } from "./services/subscribe.service";
import { LoginService } from "./services/login.service";
import { HttpClientModule } from "@angular/common/http";
import { ContactService } from "./services/contact.service";
import { ResetService } from "./services/reset.service";
import { AdminGuard } from "../guards/admin.guard";
import { RolesService } from "./services/roles.service";
import { ProductService } from "./services/product.service";
import { CartService } from "./services/cart.service";
import { OrderService } from "./services/order.service";
import { CouponService } from "./services/coupon.service";
import { ReservasService } from "./services/reservas.service";
import {CurrentUserService} from './services/current-user.service';
import {SubCategoryService} from "./services/sub-category.service";
import { CartItemService } from "./services/cart-item.service";
import { CiudadService } from "./services/ciudad.service";


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
    LoginService,
    ContactService,
    ReservasService,
    ResetService,
    RolesService,
    ProductService,
    CartService,
    CartItemService,
    OrderService,
    CouponService,
    CurrentUserService,
    SubCategoryService,
    CiudadService
  ],
  bootstrap: []
})
export class SharedModule { }
