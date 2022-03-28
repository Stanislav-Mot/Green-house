import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormGroup } from '@angular/forms';
import { Order } from '../models';
import { PATH_BACKEND_API } from '../constants';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Order[]>(`${PATH_BACKEND_API}/orders`);
  }

  getById(id: number) {
    return this.http.get<Order>(`${PATH_BACKEND_API}/orders/${id}`);
  }

  getByUserId(id: number) {
    return this.http.get<Order[]>(`${PATH_BACKEND_API}/orders/user/${id}`);
  }

  delete(id: number) {
     this.http.delete(`${PATH_BACKEND_API}/orders/${id}`).subscribe(() => {});
  }


  create(order: Order) {
    const body = {
      //   name: formGroup.controls.name.value,
      status: "В обработке",
      user: order.user,
      products: order.products
      }
    /// <reference path="" />
    return this.http.post<Order>(`${PATH_BACKEND_API}/orders/`, body);
 }

  update(formGroup: FormGroup, idCategory: number) {
    const body = {
    //   name: formGroup.controls.name.value,
    }
    return this.http.put<Order>(`${PATH_BACKEND_API}/orders/${idCategory}`, body);
  }
}
