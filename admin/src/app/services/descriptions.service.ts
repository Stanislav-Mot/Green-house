import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { Description } from '../models';
import { PATH_BACKEND_API } from '../constants';

@Injectable({ providedIn: 'root' })
export class DescriptionsService {
  constructor(private http: HttpClient) { }

  getByProductId(id: number) {
    return this.http.get<Description[]>(`${PATH_BACKEND_API}/product-descriptions/${id}`);
  }

  delete(id: number) {
    this.http.delete(`${PATH_BACKEND_API}/product-descriptions/${id}`).subscribe(() => { });
  }

 create(formGroup: FormGroup, id: number) {
    const body = {
      heading: formGroup.controls.heading.value,
      text: formGroup.controls.text.value,
    }
    return this.http.post<Description>(`${PATH_BACKEND_API}/product-descriptions/${id}`, body);
  }

  update(formGroup: FormGroup, id: number) {
    const body = {
        heading: formGroup.controls.heading.value,
        text: formGroup.controls.text.value,
    }
    return this.http.put<Description>(`${PATH_BACKEND_API}/product-descriptions/${id}`, body);
  }
}
