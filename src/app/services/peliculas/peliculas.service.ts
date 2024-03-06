import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pelicula } from '../../models/pelicula';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  constructor(private http:HttpClient) {}
  private baseUrl = 'http://localhost:8000';
  getPeliculas():Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(`${this.baseUrl}/peliculas`);
  }
}
