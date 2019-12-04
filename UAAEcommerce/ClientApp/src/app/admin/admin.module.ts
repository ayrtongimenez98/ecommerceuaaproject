import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserUpsertComponent } from './user-upsert/user-upsert.component';
import { AdminRouting } from "./admin-routing.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products/products.component';
import { ProductUpsertComponent } from './product-upsert/product-upsert.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryUpsertComponent } from './category-upsert/category-upsert.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './order/order.component';
import { CouponsComponent } from './coupons/coupons.component';
import { CouponUpsertComponent } from './coupon-upsert/coupon-upsert.component';
import { MatListModule, MatMenuModule, MatTableModule, MatIconModule, MatChipsModule, MatDividerModule, MatRadioModule, MatProgressBarModule, MatProgressSpinnerModule, MatButtonModule, MatCheckboxModule, MatSelectModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { PipesModule } from '../pipes/pipes.module';
import {SubcategoryUpsertComponent} from "./subcategory-upsert/subcategory-upsert.component";
import { CdkColumnDef } from '@angular/cdk/table';
import { CdkTableModule } from '@angular/cdk/table';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
@NgModule({
  imports: [
    CommonModule,
    AdminRouting,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgxDropzoneModule,
    MatTableModule,
    MatIconModule,
    MatDividerModule,
    MatRadioModule,
    PipesModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule,
    MatChipsModule,
    MatInputModule,
    CdkTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
    MatMenuModule
  ],
  declarations: [AdminComponent, DashboardComponent, UserComponent, UserUpsertComponent, ProductsComponent, ProductUpsertComponent, CategoriesComponent, CategoryUpsertComponent, NavMenuComponent, OrdersComponent, OrderComponent, CouponsComponent, CouponUpsertComponent, SubcategoryUpsertComponent],
  providers: [CdkColumnDef, CdkTableModule]
})
export class AdminModule { }
