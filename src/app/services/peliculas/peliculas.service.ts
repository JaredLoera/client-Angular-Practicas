import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pelicula } from '../../models/pelicula';
import { Genero } from '../../models/genero';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  constructor(private http:HttpClient) {}
  private baseUrl = 'http://localhost:8000';

  getPeliculas():Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(`${this.baseUrl}/peliculas`);
  }

  getPelicula(id: number):Observable<Pelicula> {
    return this.http.get<Pelicula>(`${this.baseUrl}/pelicula/${id}`);
  }

  getPeliculasCarrusel():Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(`${this.baseUrl}/ultimas-peliculas`);
  }

  getPeliculasGenero(genero: string):Observable<Pelicula[]> {
      return this.http.get<Pelicula[]>(`${this.baseUrl}/peliculas/${genero}`);
    }

  getGeneros():Observable<Genero[]> {
    return this.http.get<Genero[]>(`${this.baseUrl}/generos`);
  }
  
  getGenero(str: string):Observable<Genero> {
    return this.http.get<Genero>(`${this.baseUrl}/genero/${str}`);
  }
}
