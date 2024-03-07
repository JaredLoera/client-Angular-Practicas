import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffCanvasComponent } from '../../components/off-canvas/off-canvas.component';
import { NavComponent } from '../../components/nav/nav.component';
import { RouterModule,Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavComponent,
    OffCanvasComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  user = new User();
  constructor(private authService: AuthService,private router:Router) { }
  ngOnInit(): void {
    this.authService.profile().subscribe((user: User) => {
      console.log('User profile', user);
      this.user = user;
      if (!(user.rol_nombre == "Administrador")) {
        this.router.navigate(['']);
      }
    })
  }

}
