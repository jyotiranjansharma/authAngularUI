import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { confirmPasswordValidator } from 'src/app/validators/confirm-password.validator';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export default class ResetComponent implements OnInit{
    

    fb = inject(FormBuilder);
    authService = inject(AuthService);
    router = inject(Router);
    activatedRoute = inject(ActivatedRoute);

    resetForm !: FormGroup;
    token !: string;

    ngOnInit(): void {
        this.resetForm = this.fb.group({
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        },{
            validator: confirmPasswordValidator('password', 'confirmPassword')
        });

        this.activatedRoute.params.subscribe(val => {
            this.token = val['token'];
            console.log('check for the token', this.token);
        });
    }

    reset() {
        console.log("Reset form achieved.", this.resetForm.value);
        let resetObj = {
            token: this.token,
            password: this.resetForm.value.password
        }

        this.authService.resetPasswordService(resetObj)
        .subscribe({
            next: (res) => {
                console.log('res in reset passwrd', res);
                alert(res.msg);
                this.resetForm.reset();
                this.router.navigate(['login'])
            },
            error: (err) => {
                alert(err.error.message);
            }
        })
    }

}
