import { createReducer, on } from "@ngrx/store";
import { initialState } from "./todo.state";
import * as TodoActions from './todo.action';

export const todoReducer = createReducer(
    initialState,
    on(TodoActions.loadTodosSuccess, (state, { todos }) => ({
        ...state,
        todos,
        error: null,
    })),
    on(TodoActions.loadTodosFailure, (state, { error }) => ({
        ...state,
        error: error,
    }))
);

