import { Component , OnInit} from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavComponent } from '../../components/nav/nav.component';
import { OffCanvasComponent } from '../../components/off-canvas/off-canvas.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,RouterModule,NavComponent,OffCanvasComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  user = new User();
  constructor(private authService: AuthService, private router: Router){}
  ngOnInit():void{
    console.log(this.authService.getAuthToken() );
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['']);
    }
    this.authService.profile().subscribe((user:User) => {
      console.log('User profile', user);
      this.user = user;
        if(!(user.rol_nombre=="Administrador")){
          this.router.navigate(['']);
        }
    })
  }
  sendEmailConfirm(){
    this.authService.sendEmailConfirm().subscribe((data:any) => {
      console.log('Email sent', data);
    });
  }
}
