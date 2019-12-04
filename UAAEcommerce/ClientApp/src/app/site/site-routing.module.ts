import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SiteComponent } from "./site.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "../home/home.component";
import { ShopComponent } from "./shop/shop.component";
import { CartComponent } from "./cart/cart.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProductComponent } from "./product/product.component";
import { OrderComponent } from "./order/order.component";
import { ContactComponent } from "./contact/contact.component";
import { ExternalLoginComponent } from "./external-login/external-login.component";
import { RegisterComponent } from "./register/register.component";
import {CompleteRegisterComponent} from "./complete-register/complete-register.component";
import { ResetAccountComponent } from './reset-account/reset-account.component';
import { LegalComponent } from "./legal/legal.component";
import {PrivacyPolicyComponent} from "./privacy-policy/privacy-policy.component";
const routes: Routes = [
    {
        path: '',
        component: SiteComponent,
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: HomeComponent },
          { path: 'login', component: LoginComponent },
          { path: 'shop', component: ShopComponent },
          { path: 'product/:id', component: ProductComponent },
          { path: 'cart', component: CartComponent },
          { path: 'profile', component: ProfileComponent },
          { path: 'order/:hash', component: OrderComponent },
          { path: 'contact', component: ContactComponent },
          { path: 'externallogin/:id', component: ExternalLoginComponent },
          { path: 'complete-register/:id', component: CompleteRegisterComponent },
          { path: 'register', component: RegisterComponent },
          { path: 'reset-account', component: ResetAccountComponent },
          { path: 'legal', component: LegalComponent },
          { path: 'privacy-policy', component: PrivacyPolicyComponent }
        ]
    }
];

export const SiteRouting: ModuleWithProviders = RouterModule.forChild(routes);
