import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { User } from '../models';
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
}
