import { PricesProduct } from './../../models/pricesProduct';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AuthenticationService, UserService, ProductsService, OrdersService} from '../../services';
import { User, Order, Product } from 'src/app/models';
import { PATH_S3_API } from '../../constants'
import { DialogMessageComponent } from '../dialog-authentication/dialog-message/dialog-message.component'
@Component({
  selector: 'shopping-basket',
  templateUrl: './shopping-basket.component.html',
  styleUrls: ['./shopping-basket.component.scss']
})
export class ShoppingBasketComponent { 

  user: User;

  order: Order;

  PATH_S3_API: string = PATH_S3_API;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private productsService: ProductsService,
    private ordersService: OrdersService,
    public dialog: MatDialog){
    this.userService.getById(this.authenticationService.userValue.id).pipe().subscribe((user) => {
      this.user = user;
      this.order = new Order();
      this.order.user = user;
      this.order.products = user.cart_products;
      this.order.totalPrice = 0;

      this.order.pricesProduct = [];
      this.order.products.forEach(element => {
        this.order.pricesProduct.push(new PricesProduct(element.id, 1, element.price));
        this.order.totalPrice += element.price;
      });
    });
  }

  plusProduct(product: Product){

    let pricesProduct = this.order.pricesProduct.find( x => x.productsId == product.id);

    if(pricesProduct.count < 10){
      let index = this.order.pricesProduct.indexOf(pricesProduct);

      if (index !== -1) {
        this.order.pricesProduct[index].count +=1;
        this.order.pricesProduct[index].totalPrice += product.price;
        this.order.totalPrice += product.price;

     }
    }
  }

  minusProduct(product: Product){

    let pricesProduct = this.order.pricesProduct.find( x => x.productsId == product.id);

    if(pricesProduct.count > 1){
      let index = this.order.pricesProduct.indexOf(pricesProduct);

      if (index !== -1) {
        this.order.pricesProduct[index].count -=1;
        this.order.pricesProduct[index].totalPrice -= product.price;
        this.order.totalPrice += product.price;
     }
    }
  }

  sendOrder(){
    this.ordersService.create(this.order).pipe().subscribe((order) => {
      
    });
    this.dialog.open(DialogMessageComponent, {
      data: {message: 'Заказ успешно отправлен'},
      backdropClass: 'backdropBackground'
    });
  }

  countProduct(product: Product){
    let pricesProduct = this.order.pricesProduct.find( x => x.productsId == product.id);
    return pricesProduct.count;
  }

  deleteFromCart(product: Product){

    this.productsService.deleteFromCart(product.id).pipe().subscribe(() => {
      let ind = this.order.products.indexOf(product);
      this.order.products = this.order.products.slice(ind);

      let pricesProduct = this.order.pricesProduct.find( x => x.productsId == product.id);
      let index = this.order.pricesProduct.indexOf(pricesProduct);

      this.order.totalPrice -=  this.order.pricesProduct[index].totalPrice;
    });
  }
}
