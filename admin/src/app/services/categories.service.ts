import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormGroup } from '@angular/forms';
import { Category } from '../models';
import { PATH_BACKEND_API } from '../constants';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Category[]>(`${PATH_BACKEND_API}/categories`);
  }

  getById(id: number) {
    return this.http.get<Category>(`${PATH_BACKEND_API}/categories/${id}`);
  }

  delete(id: number) {
     this.http.delete(`${PATH_BACKEND_API}/categories/${id}`).subscribe(() => {});
  }

  update(formGroup: FormGroup, idCategory: number) {
    const body = {
      name: formGroup.controls.name.value,
    }
    return this.http.put<Category>(`${PATH_BACKEND_API}/categories/${idCategory}`, body);
  }

  create(formGroup: FormGroup) {
    const body = {
      name: formGroup.controls.name.value,
     }
    return this.http.post<Category>(`${PATH_BACKEND_API}/categories`, body);
  }

  updatePic(data: FormData, id: number){
    return this.http.put(`${PATH_BACKEND_API}/categories/${id}/pic`, data);
  }
}
