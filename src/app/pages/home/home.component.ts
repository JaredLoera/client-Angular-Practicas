import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeliculasService } from '../../services/peliculas/peliculas.service';
import { Pelicula } from '../../models/pelicula';
import { RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth/auth.service';
import { NgOptimizedImage } from '@angular/common';
import { NavHomeComponent } from '../../components/nav-home/nav-home.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    NavHomeComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  showSeriesDropdown: boolean = false;
  showMoviesDropdown: boolean = false;
  public user: User = new User();
  public peliculas: Pelicula[] = [];
  public peliculasCarrousel: Pelicula[] = [];

  constructor(
    private peliculasService: PeliculasService,
    private authService:AuthService
    ) {}
 
  
    ngOnInit(): void {
      this.peliculasService.getPeliculas().subscribe((peliculas: Pelicula[]) => {
        this.peliculas = peliculas;
      });
      this.peliculasService.getPeliculasCarrusel().subscribe((peliculas: Pelicula[]) => {
        this.peliculasCarrousel = peliculas;
      });
      if(this.authService.isLoggedIn()){
        this.user = this.authService.getUser()!
        console.log(this.user)
      }
 
  }
}

