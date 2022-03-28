import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule}  from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ErrorInterceptor, JwtInterceptor } from './interceptors';


import { MainPageComponent } from './components/main-page/main-page.component';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { CatalogPageComponent } from './components/catalog-page/catalog-page.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ShoppingBasketComponent } from './components/shopping-basket/shopping-basket.component';
import { HeaderComponent } from './components/header/header.component';
import {
  UserPageFavoriteComponent,
  UserPageInfoComponent,
  UserPageHistoryComponent
} from './components/user-page';
import { DialogRegAuthComponent } from './components/dialog-authentication/dialog-reg-auth/dialog-reg-auth.component'
import { DialogMessageComponent } from './components/dialog-authentication/dialog-message/dialog-message.component'
import { RedirectAuthComponent } from './components/redirect-reg/redirect-auth.component'
import { DialogUpdateAddressComponent } from './components/user-page/user-page-info/dialog-reg-auth/dialog-reg-auth.component'
import { DialogUpdateAdrMesComponent } from './components/user-page/user-page-info/dialog-message/dialog-update-adr-mes.component'
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CategoryPageComponent,
    CatalogPageComponent,
    ProductCardComponent,
    ContactsComponent,
    ShoppingBasketComponent,
    HeaderComponent,
    UserPageFavoriteComponent,
    UserPageInfoComponent,
    UserPageHistoryComponent,
    DialogRegAuthComponent,
    DialogMessageComponent,
    RedirectAuthComponent,
    DialogUpdateAddressComponent,
    DialogUpdateAdrMesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    JwPaginationModule


  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true,
  },{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
  }],  bootstrap: [AppComponent]
})
export class AppModule { }
