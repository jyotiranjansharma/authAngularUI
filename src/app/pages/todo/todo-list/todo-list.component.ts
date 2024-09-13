import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { apiUrls } from '../../../api.urls';
import AddTodoComponent from '../add-todo/add-todo.component';
import { Observable, Subscription } from 'rxjs';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as TodoSelectors from '../state/todo.selector'
import { loadTodos } from '../state/todo.action';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, RouterModule, AddTodoComponent, TruncatePipe, AsyncPipe],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export default class TodoListComponent implements OnInit, OnDestroy{
    
    notesList: any = [];
    router = inject(Router)
    authService = inject(AuthService)
    notesList$!: Observable<Todo[]>
    urlList = apiUrls
    private subscription!: Subscription;

    constructor(private store: Store<AppState>) {
        
    }

    ngOnInit() {
        
        // this.subscription = this.authService.notes$.subscribe({
        //     next:(notes) => this.notesList = notes
        // });
        this.store.dispatch(loadTodos());
        this.store.select(TodoSelectors.selectAllTodos).subscribe(notes => {
            this.notesList = notes
        })
        
        
        console.log('notelists', this.notesList)
    }

    onDeleteNote(note: any) {
        if(confirm("Are you sure to delete ?")) {
            this.authService.deleteNote(note._id).subscribe({
                next: (res) => {
                    this.authService.getAllNotes()
                },
                error: (err) => {
                    console.log(err);
                }
            })
        }
    }

    onUpdateNote(note: any) {
        console.log('on update note', note)
        const noteId = note._id
        this.router.navigate([`todoList/edit/${noteId}`])
    }

    ngOnDestroy() {
        // this.subscription.unsubscribe();
    }
}
