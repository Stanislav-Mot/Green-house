import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component'
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { CatalogPageComponent } from './components/catalog-page/catalog-page.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ShoppingBasketComponent } from './components/shopping-basket/shopping-basket.component'

import { AuthGuard } from './utils/auth.guard';
import { Role } from './enums';

import {
  UserPageFavoriteComponent,
  UserPageInfoComponent,
  UserPageHistoryComponent
} from './components/user-page';
import { RedirectAuthComponent } from './components/redirect-reg/redirect-auth.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'category',
    component: CategoryPageComponent,
  },
  {
    path: 'catalog',
    component: CatalogPageComponent,
  },
  {
    path: 'products/:id',
    component: ProductCardComponent,
  },
  {
    path: 'contacts',
    component: ContactsComponent,
  },
  {
    path: 'basket',
    component: ShoppingBasketComponent,
  },
  {
    path: 'user',
    component: UserPageInfoComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.user, Role.admin] },
  },
  {
    path: 'user/history',
    component: UserPageHistoryComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.user, Role.admin] },
  },
  {
    path: 'user/favorite',
    component: UserPageFavoriteComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.user, Role.admin] },
  },{
    path: 'user/:code',
    component: RedirectAuthComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
