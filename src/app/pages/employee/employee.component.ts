import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPasswordValidator } from 'src/app/validators/confirm-password.validator';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

interface employeeRegisterForm {
    firstname: FormControl<string>,
    lastname: FormControl<string>,
    email: FormControl<string>,
    username: FormControl<string>,
    password: FormControl<string>,
    confirmPassword: FormControl<string>
}

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export default class EmployeeComponent implements OnInit{

    employeeRegisterForm!: FormGroup<employeeRegisterForm> //this is how the typed form control looks like in new angular 14, this gives all the defined types
    // employeeRegisterForm!: FormGroup // this gives the data as type any when we check

    fb = inject(FormBuilder);
    authService = inject(AuthService)
    router = inject(Router)
    
    ngOnInit() {
        this.employeeRegisterForm = this.fb.group({
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

        // let d = this.employeeRegisterForm.value; // when you check on hover on the variable d it says all the types involved

    }

    register() {
        console.log('Employee register.', this.employeeRegisterForm.value);
        this.authService.registerEmployeeService(this.employeeRegisterForm.value).subscribe({
            next:(res) => {
                alert("Employee record created");
                this.employeeRegisterForm.reset();
                this.router.navigate(['home'])
            },
            error: (err) => {
                console.log(err);
            }
        })
    }
}
