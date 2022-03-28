import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { Product } from '../models';
import { PATH_BACKEND_API } from '../constants';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Product[]>(`${PATH_BACKEND_API}/products`);
  }

  getById(id: number) {
    return this.http.get<Product>(`${PATH_BACKEND_API}/products/${id}`);
  }

  delete(id: number) {
    this.http.delete(`${PATH_BACKEND_API}/products/${id}`).subscribe(() => { });
  }

 create(formGroup: FormGroup) {
    const body = {
      name: formGroup.controls.name.value,
      price: formGroup.controls.price.value,
      sale: formGroup.controls.sale.value,
      category: formGroup.controls.category.value,
    }
    return this.http.post<Product>(`${PATH_BACKEND_API}/products`, body);
  }

  update(formGroup: FormGroup) {
    const body = {
        email: formGroup.controls.email.value,
        phone: formGroup.controls.phone.value,
        role: formGroup.controls.role.value
    }
    return this.http.put<Product>(`${PATH_BACKEND_API}/products/${formGroup.controls.id.value}`, body);
  }

  updatePic(data: FormData, id: number){
    return this.http.put(`${PATH_BACKEND_API}/products/${id}/pic`, data);
}
}
