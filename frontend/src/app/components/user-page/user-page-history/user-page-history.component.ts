import { OrdersService } from './../../../services/orders.service';
import { Order } from 'src/app/models';
import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services';

@Component({
  selector: 'user-page-history',
  templateUrl: './user-page-history.component.html',
  styleUrls: ['./user-page-history.component.scss']
})
export class UserPageHistoryComponent { 

  orders: Order[];

  constructor(private authenticationService: AuthenticationService, private ordersService: OrdersService) { 
    this.ordersService.getByUserId(authenticationService.userValue.id).pipe().subscribe((orders) => {
      this.orders = orders;
    });
  }

  logout() {
    this.authenticationService.logout();
  }
}
