import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { PeliculasService } from '../../services/peliculas/peliculas.service';
import { Pelicula } from '../../models/pelicula';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {
  pelicula = new Pelicula();
  videoStream: any;
  videoUrl!: SafeResourceUrl;
  id = this.route.snapshot.params['id'];
  constructor(private peliculaService: PeliculasService, private route: ActivatedRoute, private http: HttpClient) { }
  ngOnInit(): void {
    this.peliculaService.getPelicula(this.id).subscribe((pelicula: Pelicula) => {
      this.pelicula = pelicula;
      console.log(this.pelicula);
    });
  }
}
