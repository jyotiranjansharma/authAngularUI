import { Todo } from "src/app/models/todo.model";

export interface TodoState {
    todos: Todo[]
}

export const initialState: TodoState = {
    todos :[]
}