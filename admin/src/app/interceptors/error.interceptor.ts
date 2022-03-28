import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
 HttpRequest,
 HttpHandler,
 HttpEvent,
 HttpInterceptor
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((err) => {
            if ([401].indexOf(err.status) !== -1) {
                this.router.navigate([`/login`]);
            }
            if ([403].indexOf(err.status) !== -1) {
                this.router.navigate([`/forbidden`]);
            }
            return throwError(err.error.errors[0].message);
        }))
    }
}
