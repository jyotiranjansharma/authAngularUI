import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LogInterceptor } from './interceptors/log.interceptor';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { TodoEffects } from './pages/todo/state/todo.effects';
import { todoReducer } from './pages/todo/state/todo.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(HttpClientModule),
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: LogInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    },
    provideStore(),
    provideState({ name: 'todos', reducer: todoReducer }),
    provideEffects(TodoEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
