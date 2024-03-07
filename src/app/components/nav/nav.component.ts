import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(private authService:AuthService,private router:Router){}
  closeSession(){
    this.authService.logout();
    this.authService.clearAuthToken();
    this.router.navigate(['']);
  }
}
