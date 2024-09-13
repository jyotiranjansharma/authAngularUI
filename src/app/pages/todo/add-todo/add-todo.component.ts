import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export default class AddTodoComponent implements OnInit{
    fb = inject(FormBuilder)
    router = inject(Router)
    notesForm!: FormGroup
    authService = inject(AuthService)

    ngOnInit() {
        this.notesForm = this.fb.group({
            title: [''],
            createdBy: [''],
            noteType: [''],
            details: [''],
        })
    }

    add() {
        console.log('new notes data', this.notesForm.value);
        this.authService.createANote(this.notesForm.value).subscribe({
            next:(res) => {
                alert("A new note has been added. Thank you.");
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
