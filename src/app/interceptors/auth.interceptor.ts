import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = sessionStorage.getItem('jwtToken')
        if (token) {
            const clonedReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });

            return next.handle(clonedReq);
        } else {
            return next.handle(req);
        }
    }
}