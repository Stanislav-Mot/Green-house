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

  delete(id: number) {
     this.http.delete(`${PATH_BACKEND_API}/orders/${id}`).subscribe(() => {});
  }

  update(formGroup: FormGroup, idOrder: number) {
    const body = {
    //   name: formGroup.controls.name.value,
    }
    return this.http.put<Order>(`${PATH_BACKEND_API}/orders/${idOrder}`, body);
  }

  updateStatus(status: string, idOrder: number) {
    return this.http.put<Order>(`${PATH_BACKEND_API}/orders/${idOrder}/status`, status);
  }
}
