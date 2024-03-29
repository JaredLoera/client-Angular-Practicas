import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup,ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { User } from '../../models/user';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Token } from '../../models/token';
import { ActivatedRoute, Router } from '@angular/router';
import {RouterModule} from '@angular/router';
import { NavHomeComponent } from '../../components/nav-home/nav-home.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NavHomeComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  public userForm: FormGroup;
  formSubmittedErrors = false;
  user: User = new User();
  constructor(private fb: FormBuilder, private authService: AuthService, private route: ActivatedRoute, private router: Router){
    this.userForm = this.fb.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required]]
    });
  }
  submitForm() {
    if (this.userForm.valid) {
      this.user = this.userForm.value;
      this.authService.login(this.user).subscribe((token:Token) => {
        console.log('User logged in', token);
        this.authService.setAuthToken(token.token);
        this.cargarPerfil();
      });
    }
    else {
      this.formSubmittedErrors = true;
    }
  }
  cargarPerfil(){
    this.authService.profile().subscribe((user:User) => {
      console.log('User profile', user);
      this.user = user;
      this.authService.setUser(user);
    });
  }
}
