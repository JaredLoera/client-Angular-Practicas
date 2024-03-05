import { Component , OnInit} from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  user = new User();
  constructor(private authService: AuthService, private router: Router){}

  closeSession(){
    this.authService.logout();
    this.authService.clearAuthToken();
    this.router.navigate(['']);
  }

  ngOnInit():void{
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['']);
    }
    this.authService.profile().subscribe((user:User) => {
      console.log('User profile', user);
      this.user = user;
    })
  }
  sendEmailConfirm(){
    this.authService.sendEmailConfirm().subscribe((data:any) => {
      console.log('Email sent', data);
    });
  }
}
