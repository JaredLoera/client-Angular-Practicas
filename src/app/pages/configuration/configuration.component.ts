import { Component,OnInit } from '@angular/core';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css'
})
export class ConfigurationComponent implements OnInit {
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
