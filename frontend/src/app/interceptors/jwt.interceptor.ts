import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { User } from '../models';
import { AuthenticationService } from '../services';
import { PATH_BACKEND_API } from '../constants';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  user!: User ;

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.authenticationService.userValue;
    const isLoggedIn = user && user.token;
    const isApiUrl = request.url.startsWith(PATH_BACKEND_API);

    let returnedRequest: HttpRequest<any> = request;

    if (isLoggedIn && isApiUrl) {
      returnedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    }

    return next.handle(returnedRequest);
  }
}