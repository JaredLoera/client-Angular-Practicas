import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Validators ,FormBuilder} from '@angular/forms';
import { RouterModule,ActivatedRoute} from '@angular/router';
import { NavHomeComponent } from '../../components/nav-home/nav-home.component';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth/auth.service';
import { SalasService } from '../../services/salas/salas.service';

@Component({
  selector: 'app-sala',
  standalone: true,
  imports: [
    CommonModule,
    NavHomeComponent,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './sala.component.html',
  styleUrl: './sala.component.css'
})
export class SalaComponent implements OnInit {
 user: User = new User();
 formSubmittedErrors = false;
 userFrom: FormGroup;
 id = this.route.snapshot.params['id'];
  constructor(private authService: AuthService,private route: ActivatedRoute,private salasService: SalasService) { 
    this.userFrom = new FormBuilder().group({
      email: [this.user.email, [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.authService.profile().subscribe((user: User) => {
      this.user = user;
    });
    console.log(this.authService.getAuthToken());
  }
  submitForm() {
    if (this.userFrom.valid) {
      const email = this.userFrom.value['email'];
      this.salasService.salaInvitacion(this.id,email).subscribe((data) => {
        console.log(data);
        this.userFrom.reset();
      });
    }
    this.formSubmittedErrors = true;
  }
 
}
