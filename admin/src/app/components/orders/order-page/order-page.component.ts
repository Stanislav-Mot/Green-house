import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';

import { OrdersService } from '../../../services';
import { Order } from '../../../models';

@Component({
    selector: 'app-order-page',
    templateUrl: 'order-page.component.html',
    styleUrls: ['order-page.component.scss']
})
export class OrderPageComponent {

    order!: Order;

    idOrder: number;

    constructor(
        private ordersService: OrdersService,
        private route: ActivatedRoute,
        private _location: Location,
        private router: Router
        ) { 
        this.idOrder = this.route.snapshot.params.id;
        this.ordersService.getById(this.idOrder).pipe().subscribe((order) => {
          this.order = order;
        });
      }

      backClicked() {
        this._location.back();
    }

    navigatePageProduct(id: number) {
        this.router.navigate([`/products/${id}`]);
    }

    navigatePageUser(id: number) {
        this.router.navigate([`/users/${id}`]);
    }

    updateStatus(status: string){
        this.ordersService.updateStatus(status, this.idOrder).pipe().subscribe((order) => {
            this.order.status = order.status;
        })
    }
}