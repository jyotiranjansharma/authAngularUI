import { inject, Injectable, Injector } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    authService = inject(AuthService);
    constructor(private injector: Injector) { 
        
    }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.authService = this.injector.get<AuthService>(AuthService)
        const token = this.authService.getToken();
        
        if (token && this.isTokenExpired(token)) {
            return this.authService.refreshToken().pipe(
                switchMap((newToken: string) => {
                    request = request.clone({
                        setHeaders: { Authorization: `Bearer ${newToken}` }
                    });
                    return next.handle(request);
                })
            );
        }

        if (token) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }

        return next.handle(request);
    }

    private isTokenExpired(token: string): boolean {
        const expirationDate = this.authService.getTokenExpirationDate(token);
        return expirationDate ? expirationDate.valueOf() < new Date().valueOf() : false;
    }
}
