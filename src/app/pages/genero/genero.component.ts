import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,ActivatedRoute } from '@angular/router';
import { NavHomeComponent } from '../../components/nav-home/nav-home.component';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth/auth.service';
import { PeliculasService } from '../../services/peliculas/peliculas.service';
import { Pelicula } from '../../models/pelicula';
import { Genero } from '../../models/genero';

@Component({
  selector: 'app-genero',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavHomeComponent
  ],
  templateUrl: './genero.component.html',
  styleUrl: './genero.component.css'
})
export class GeneroComponent implements OnInit{
  public user: User = new User();
  public peliculas: Pelicula[] = [];
  public genero = new Genero();
  public generoUrl : string = '';

  constructor(private authService: AuthService,private peliculaService:PeliculasService,private Route:ActivatedRoute) { }

  ngOnInit(): void {
      this.authService.profile().subscribe((user: User) => {
        this.user = user;
      });
      this.Route.params.subscribe(params => {
        this.generoUrl = params['genero'];
        this.loadPeliculas();
    });
  }
 loadPeliculas(){
    this.peliculaService.getPeliculasGenero(this.generoUrl).subscribe((peliculas: Pelicula[]) => {
      this.peliculas = peliculas;
    });
    this.peliculaService.getGenero(this.generoUrl).subscribe((data: Genero) => {
      this.genero = data
    });
 }
}
