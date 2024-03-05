import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { User } from '../../models/user';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  public userForm: FormGroup;
  formSubmittedErrors = false;
  user: User = new User();
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
      this.authService.register(this.user).subscribe((user: User) => {
        console.log('User registered', user);
        this.router.navigate(['']);
      });
    }
    else {
      this.formSubmittedErrors = true;
    }
  }
}