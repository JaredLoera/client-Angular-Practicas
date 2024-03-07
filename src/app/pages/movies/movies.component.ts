import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Pelicula } from '../../models/pelicula';
import { PeliculasService } from '../../services/peliculas/peliculas.service';
import { NavComponent } from '../../components/nav/nav.component';
import { OffCanvasComponent } from '../../components/off-canvas/off-canvas.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavComponent,
    OffCanvasComponent
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit{
  user = new User();
  peliculas:Pelicula[] = [];
  constructor(private authService:AuthService,private peliculasService:PeliculasService,private router:Router){}
  ngOnInit():void{
    this.authService.profile().subscribe((user:User) => {
      console.log('User profile', user);
      this.user = user;
      if(!(user.rol_nombre=="Administrador")){
        this.router.navigate(['']);
      }
    })
    this.peliculasService.getPeliculas().subscribe((peliculas:Pelicula[]) => {
      this.peliculas = peliculas;
      console.log('Peliculas', peliculas);
    });
  }
}
