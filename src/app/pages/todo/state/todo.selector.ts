import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TodoState } from "./todo.state";

export const selectTodoFeature = createFeatureSelector<TodoState>('todos');

export const selectAllTodos = createSelector(
  selectTodoFeature,
  (state: TodoState) => {return state.todos}
)

export const selectTodoError = createSelector(
  selectTodoFeature,
  (state: TodoState) => state.todos
);

