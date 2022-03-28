import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { User, Address } from '../models';
import { PATH_BACKEND_API } from '../constants';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${PATH_BACKEND_API}/users`);
  }

  getById(id: number) {
    return this.http.get<User>(`${PATH_BACKEND_API}/users/${id}`);
  }

  delete(id: number) {
    this.http.delete(`${PATH_BACKEND_API}/users/${id}`).subscribe(() => { });
 }

  update(formGroup: FormGroup) {
    const body = {
        email: formGroup.controls.email.value,
        phone: formGroup.controls.phone.value,
        role: formGroup.controls.role.value
    }
    return this.http.put<User>(`${PATH_BACKEND_API}/users/${formGroup.controls.id.value}`, body);
  }

  create(formGroup: FormGroup){
    const body = {
      first_name: formGroup.controls.first_name.value,
      last_name: formGroup.controls.last_name.value,
      email: formGroup.controls.email.value,
      phone: formGroup.controls.phone.value,
      password: formGroup.controls.password.value
    }
    return this.http.post<User>(`${PATH_BACKEND_API}/users`, body);
  }

  activate(code: String){
    this.http.get(`${PATH_BACKEND_API}${code}/activate`).subscribe(() => { });
  }

  updateAddress(formGroup: FormGroup, id: number){
    const body = {
      city: formGroup.controls.city.value,
      street: formGroup.controls.street.value,
      build: formGroup.controls.build.value,
      entrance: formGroup.controls.entrance.value,
      flat: formGroup.controls.flat.value
  }
  return this.http.put<Address>(`${PATH_BACKEND_API}/users/${id}/address`, body);
  }
}
