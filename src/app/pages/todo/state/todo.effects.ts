import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { apiUrls } from 'src/app/api.urls';
import * as TodoActions from './todo.action'
import { Todo } from 'src/app/models/todo.model';

@Injectable()
export class TodoEffects {
    constructor(private actions$: Actions, private http: HttpClient, private authservice: AuthService) { }

    authService = inject(AuthService)

    loadItems$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TodoActions.loadTodos),
            mergeMap(() =>
                this.http.get<Todo[]>(`${apiUrls.notes}`).pipe(
                    map((data) => {
                        return TodoActions.loadTodosSuccess({ todos: data })
                    }),
                    catchError((error: { error: string }) =>
                        of(
                            TodoActions.loadTodosFailure({
                                error: 'Failed'
                            })
                        )
                    )
                ))
        ));
}
