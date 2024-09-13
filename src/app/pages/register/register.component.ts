import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPasswordValidator } from 'src/app/validators/confirm-password.validator';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent implements OnInit {
    fb = inject(FormBuilder);
    authService = inject(AuthService);
    router = inject(Router);

    registerForm !: FormGroup;

    ngOnInit(): void {
        this.registerForm = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            username: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        },
        {
            validator: confirmPasswordValidator('password', 'confirmPassword')
        })
        // let d = this.registerForm.value; // check on hover of the variable it says any as type
    }

    register() {
        console.log('values from form', this.registerForm.value);
        this.authService.registerService(this.registerForm.value).subscribe({
            next:(res) => {
                alert("User created");
                this.registerForm.reset();
                this.router.navigate(['login'])
            },
            error: (err) => {
                console.log(err);
            }
        })
    }
}
