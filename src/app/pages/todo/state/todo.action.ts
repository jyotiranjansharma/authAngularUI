import { createAction, props } from "@ngrx/store";
import { Todo } from "src/app/models/todo.model";

export const loadTodos = createAction('[Todo Component] loadTodos');
export const loadTodosSuccess = createAction('[Todo Component] loadTodosSuccess', props<{ todos: Todo[] }>());
export const loadTodosFailure = createAction('[Todo Component] loadTodosFailure', props<{ error: string }>());

export const addItem = createAction('[Item] Add Item', props<{ todos: Todo }>());
// export const addItemSuccess = createAction('[Item] Add Item Success', props<{ item: Todo }>());
// export const addItemFailure = createAction('[Item] Add Item Failure', props<{ error: Todo }>());

export const updateItem = createAction('[Item] Update Item', props<{ item: Todo }>());
// export const updateItemSuccess = createAction('[Item] Update Item Success', props<{ item: Todo }>());
// export const updateItemFailure = createAction('[Item] Update Item Failure', props<{ error: Todo }>());

export const deleteItem = createAction('[Item] Delete Item', props<{ id: string }>());
// export const deleteItemSuccess = createAction('[Item] Delete Item Success', props<{ id: string }>());
// export const deleteItemFailure = createAction('[Item] Delete Item Failure', props<{ error: Todo }>());