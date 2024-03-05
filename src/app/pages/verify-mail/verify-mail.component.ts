import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-verify-mail',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './verify-mail.component.html',
  styleUrl: './verify-mail.component.css'
})
export class VerifyMailComponent {
  title = "Verificado"
  id = this.route.snapshot.params['id'];
  signature = this.route.snapshot.queryParams['signature'];

constructor(private route: ActivatedRoute,private auth: AuthService) { }
 
   ngOnInit(): void {
    this.auth.verifyUser(this.id,this.signature).subscribe((data:any) => {
      console.log('Email verified', data);
    });
   }
   changeTitleButton(){
    this.title = "Volver..."
   }
   changeTitleButtonBefore(){
    this.title = "Verificado"
   }
}
