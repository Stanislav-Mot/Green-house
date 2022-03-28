import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent } from './components/main-page';
import { LoginComponent } from './components/login';
import { Role } from './enums';
import { AuthGuard } from './utils/auth.guard';
import {
  ProductListComponent,
  ProductPageComponent,
  ProductCreateComponent
} from './components/products';
import {
  UsersListComponent,
  UserPageComponent
} from './components/users';

import {
  CategoryPageComponent,
  CategoryListComponent,
  CategoryCreateComponent
} from './components/categories'
import {
  OrderPageComponent,
  OrderListComponent
} from './components/orders';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.admin] },
  },
  {
    path: 'categories',
    component: CategoryListComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.admin] },
  },
  {
    path: 'categories/create',
    component: CategoryCreateComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.admin] },
  },
  {
    path: 'categories/:id',
    component: CategoryPageComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.admin] },
  },
  {
    path: 'users',
    component: UsersListComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.admin] },
  },
  {
    path: 'users/:id',
    component: UserPageComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.admin] },
  },
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.admin] },
  },
  {
    path: 'products/create',
    component: ProductCreateComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.admin] },
  },
  {
    path: 'products/:id',
    component: ProductPageComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.admin] },
  },
  {
    path: 'orders',
    component: OrderListComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.admin] },
  },
  {
    path: 'orders/:id',
    component: OrderPageComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.admin] },
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
