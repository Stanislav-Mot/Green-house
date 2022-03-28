import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models';
import { PATH_BACKEND_API } from '../constants';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public user: Observable<User | null>;

    private userSubject: BehaviorSubject<User | null>;

    constructor(
        private router: Router,
        private http: HttpClient,
    ) {
      const userJson = localStorage.getItem('user');

      if(userJson != null) {

        this.userSubject = new BehaviorSubject<User | null>(JSON.parse(userJson));
      }else {
        this.userSubject = new BehaviorSubject<User | null>(null);
      }
      this.user = this.userSubject.asObservable();
    }

    public get userValue(): User | null {
      return this.userSubject.value;
    }

    login(email: string, password: string) {
      return this.http.post<any>(`${PATH_BACKEND_API}/authenticate`, { email, password })
      .pipe(map((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
    }

    logout() {
      localStorage.removeItem('user');
      this.userSubject.next(null as any);
      this.router.navigate(['/login']);
    }
}
