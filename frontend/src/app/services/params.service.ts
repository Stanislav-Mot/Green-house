import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { Param } from '../models';
import { PATH_BACKEND_API } from '../constants';

@Injectable({ providedIn: 'root' })
export class ParamsService {
  constructor(private http: HttpClient) { }

  getById(id: number) {
    return this.http.get<Param[]>(`${PATH_BACKEND_API}/product-params/${id}`);
  }

  update(formGroup: FormGroup, id: number) {
    const body = {
        text: formGroup.controls.text.value,
        percent: formGroup.controls.percent.value,
    }
    return this.http.put<Param>(`${PATH_BACKEND_API}/product-params/${id}`, body);
  }
}
