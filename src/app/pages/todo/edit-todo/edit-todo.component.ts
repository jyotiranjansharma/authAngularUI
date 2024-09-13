import { Component, DoCheck, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CanComponentDeactivate } from 'src/app/can-deactivate.guard';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-edit-todo',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: './edit-todo.component.html',
    styleUrls: ['./edit-todo.component.scss']
})
export default class EditTodoComponent implements OnInit, DoCheck, CanComponentDeactivate {
    
    fb = inject(FormBuilder)
    authService = inject(AuthService)
    notesForm!: FormGroup;
    route = inject(ActivatedRoute)
    router = inject(Router)

    note: any;
    hasUnsavedChanges: boolean = false;

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            this.authService.getNoteById(id).subscribe(note => {
                this.note = note.data;
                localStorage.setItem('noteId', this.note._id)
                this.createForm()
            })
        })
    }

    ngDoCheck() {
        console.log('changes detcted');
        this.hasUnsavedChanges = true
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (this.hasUnsavedChanges) {
            return confirm('You have unsaved changes! Do you really want to leave?');
        }
        return true;
    }

    createForm() {
        console.log(this.note.title);
        this.notesForm = this.fb.group({
            title: new FormControl(this.note.title),
            details: new FormControl(this.note.details),
            createdBy: new FormControl(this.note.createdBy),
            noteType: new FormControl(this.note.noteType)
        })
    }

    update() {
        const title = this.notesForm.value.title;
        const createdBy = this.notesForm.value.createdBy;
        const noteType = this.notesForm.value.noteType;
        const details = this.notesForm.value.details;

        const note = {
            id: localStorage.getItem('noteId'),
            title,
            createdBy,
            noteType,
            details
        }

        this.authService.updateNote({note}).subscribe({
            next:(res) => {
                alert("Note updated. Thank you.");
                this.notesForm.reset();
                this.router.navigate(['todoList'])
                this.authService.getAllNotes()
            },
            error: (err) => {
                console.log(err);
            }
        })
    }
}
