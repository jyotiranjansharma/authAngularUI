import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export default class ForgetPasswordComponent implements OnInit{
    fb = inject(FormBuilder);
    forgetForm !: FormGroup;
    authService = inject(AuthService);
    router = inject(Router);

    ngOnInit(): void {
        this.forgetForm = this.fb.group({
            email:  ['', Validators.compose([Validators.required, Validators.email])]
        })
    }

    forget() {
        console.log('this.forgetForm.value', this.forgetForm.value);
        this.authService.sendEmailService(this.forgetForm.value.email)
        .subscribe({
            next: (res) => {
                console.log('res in forgot passwrd', res);
                alert(res.msg);
                this.forgetForm.reset();
            },
            error: (err) => {
                alert(err.error.message);
            }
        })
        return true;
    }

    cancel() {
        console.log("Cancel");
    }
}
