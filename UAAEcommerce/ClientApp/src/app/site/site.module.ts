import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {SiteComponent} from './site.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {SiteRouting} from './site-routing.module';
import {CartComponent} from './cart/cart.component';
import {ShopComponent} from './shop/shop.component';
import {ProductComponent} from './product/product.component';
import {NavMenuComponent} from './nav-menu/nav-menu.component';
import {FooterComponent} from './footer/footer.component';
import {OrderComponent} from './order/order.component';
import {ContactComponent} from './contact/contact.component';
import {ExternalLoginComponent} from './external-login/external-login.component';
import {RegisterComponent} from './register/register.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {AgmCoreModule} from '@agm/core';
import {PipesModule} from '../pipes/pipes.module';
import {CartInfoComponent} from './nav-menu/cart-info/cart-info.component';
import {ItemModalComponent} from './shop/item-modal/item-modal.component';
import {DebounceClickDirective} from '../directives/debounce-click.directive';
import {UserCartService} from '../shared/services/user-cart.service';
import { CompleteRegisterComponent } from './complete-register/complete-register.component';
import { CdkColumnDef } from '@angular/cdk/table';
import { CdkTableModule } from '@angular/cdk/table';
import { ProfileComponent } from './profile/profile.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DemoMaterialModule } from './material-module';
import { ResetAccountComponent } from './reset-account/reset-account.component';
import {environment} from "../../environments/environment";
import { LegalComponent } from './legal/legal.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    DemoMaterialModule,
    SiteRouting,
    ReactiveFormsModule,
    SharedModule,
    BrowserAnimationsModule,
    PipesModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    }),
  ],
  declarations: [
    LoginComponent,
    SiteComponent,
    CartComponent,
    ShopComponent,
    ProductComponent,
    NavMenuComponent,
    OrderComponent,
    FooterComponent,
    ContactComponent,
    ExternalLoginComponent,
    RegisterComponent,
    CartInfoComponent,
    ItemModalComponent,
    DebounceClickDirective,
    CompleteRegisterComponent,
    ProfileComponent,
    ResetAccountComponent,
    LegalComponent,
    PrivacyPolicyComponent
  ],
  providers: [
    UserCartService, CdkColumnDef, CdkTableModule, LayoutModule,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000}}
  ],
  entryComponents: [ItemModalComponent],
})
export class SiteModule {
}
