import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup,ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { User } from '../../models/user';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Token } from '../../models/token';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
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
      this.authService.login(this.user).subscribe((token:Token) => {
        console.log('User logged in', token);
        this.authService.setAuthToken(token.token);
        this.router.navigate(['/dashboard']);
      });
    }
    else {
      this.formSubmittedErrors = true;
    }
  }
}
