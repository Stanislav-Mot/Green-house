import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login';
import { HeaderComponent } from './components/header';
import { MainPageComponent } from './components/main-page';
import { AppComponent } from './app.component';

import { DialogComponent } from './components/dialog/dialog.component';
import { ErrorInterceptor, JwtInterceptor } from './interceptors';
import {
  ProductPageComponent,
  ProductListComponent,
  ProductCreateComponent,
  ProductImageComponent,
  ProductInfoComponent,
  ProductDescriptonComponent,
  ProductParamComponent
} from './components/products'
import {
  UsersListComponent,
  UserPageComponent
  } from './components/users'
import {
   CategoryPageComponent,
   CategoryListComponent,
   CategoryCreateComponent
  } from './components/categories'
  import {
    OrderListComponent,
    OrderPageComponent
  } from './components/orders'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    HeaderComponent,
    CategoryPageComponent,
    CategoryListComponent,
    CategoryCreateComponent,
    DialogComponent,
    UsersListComponent,
    UserPageComponent,
    ProductPageComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductImageComponent,
    ProductDescriptonComponent,
    ProductInfoComponent,
    ProductParamComponent,
    OrderListComponent,
    OrderPageComponent
  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSelectModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatDialogModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatStepperModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true,
  },{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
