import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { AdminGuard } from "../guards/admin.guard";
import { UserComponent } from "./user/user.component";
import { UserUpsertComponent } from "./user-upsert/user-upsert.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CategoriesComponent } from "./categories/categories.component";
import { CategoryUpsertComponent } from "./category-upsert/category-upsert.component";
import { SubcategoryUpsertComponent } from "./subcategory-upsert/subcategory-upsert.component";
import { ProductsComponent } from "./products/products.component";
import { ProductUpsertComponent } from "./product-upsert/product-upsert.component";
import { OrdersComponent } from "./orders/orders.component";
import { OrderComponent } from "./order/order.component";
import { CouponsComponent } from "./coupons/coupons.component";
import { CouponUpsertComponent } from "./coupon-upsert/coupon-upsert.component";

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] },
      { path: 'user', component: UserComponent, canActivate: [AdminGuard] },
      { path: 'user-upsert', component: UserUpsertComponent, canActivate: [AdminGuard] },
      { path: 'user-upsert/:id', component: UserUpsertComponent, canActivate: [AdminGuard] },
      { path: 'categories', component: CategoriesComponent, canActivate: [AdminGuard] },
      { path: 'category-upsert', component: CategoryUpsertComponent, canActivate: [AdminGuard] },
      { path: 'subcategory-upsert', component: SubcategoryUpsertComponent, canActivate: [AdminGuard] },
      { path: 'subcategory-upsert/:id', component: SubcategoryUpsertComponent, canActivate: [AdminGuard] },
      { path: 'category-upsert/:id', component: CategoryUpsertComponent, canActivate: [AdminGuard] },
      { path: 'products', component: ProductsComponent, canActivate: [AdminGuard] },
      { path: 'product-upsert', component: ProductUpsertComponent, canActivate: [AdminGuard] },
      { path: 'product-upsert/:id', component: ProductUpsertComponent, canActivate: [AdminGuard] },
      { path: 'order/:id', component: OrderComponent, canActivate: [AdminGuard] },
      { path: 'orders', component: OrdersComponent, canActivate: [AdminGuard] },
      { path: 'coupons', component: CouponsComponent, canActivate: [AdminGuard] },
      { path: 'coupon-upsert', component: CouponUpsertComponent, canActivate: [AdminGuard] }
    ]
  }
];

export const AdminRouting: ModuleWithProviders = RouterModule.forChild(routes);
