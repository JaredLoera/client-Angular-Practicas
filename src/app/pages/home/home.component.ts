import { Component,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeliculasService } from '../../services/peliculas/peliculas.service';
import { Pelicula } from '../../models/pelicula';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  showSeriesDropdown: boolean = false;
  showMoviesDropdown: boolean = false;

  public peliculas:Pelicula[] = [];


  constructor(private peliculasService:PeliculasService) {}
ngOnInit(): void {
    this.peliculasService.getPeliculas().subscribe((peliculas:Pelicula[]) => {
      this.peliculas = peliculas;
    });
  
}



  onMouseOverMovies(): void {
    if (window.innerWidth > 992) {
      this.showMoviesDropdown = true;
    }
  }

  onMouseOutMovies(): void {
    this.showMoviesDropdown = false;
  }

  onMouseOverSeries(): void {
    if (window.innerWidth > 992) {
      this.showSeriesDropdown = true;
    }
  }

  onMouseOutSeries(): void {
    this.showSeriesDropdown = false;
  }

}
