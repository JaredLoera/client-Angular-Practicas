import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { User } from '../../models/user';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ValidateErrors } from '../../models/validateErrors';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  public userForm: FormGroup;
  formSubmittedErrors = false;
  user: User = new User();
  errorValidations:ValidateErrors[] = [];
  
  constructor(private fb: FormBuilder, private authService: AuthService, private route: ActivatedRoute, private router: Router){
    this.userForm = this.fb.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required]]
    });
  }
  ngOnInit(){
    if(this.authService.isLoggedIn()){
      this.router.navigate(['dashboard']);
    }
  }
  submitForm() {
    if (this.userForm.valid) {
      this.user = this.userForm.value;
      this.authService.register(this.user).pipe(
        catchError((error:HttpErrorResponse) => {
          if(error.status === 400) {
            this.errorValidations = error.error['errors'];
          }
          return throwError(() => new Error('algo paso, Por favor intente depues.'));
        }
      )).subscribe(() => {
        this.router.navigate(['']);
      })
    }
    else {
      this.formSubmittedErrors = true;
    }
  }
}
