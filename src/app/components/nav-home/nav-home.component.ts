import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth/auth.service';
import { Genero } from '../../models/genero';
import { PeliculasService } from '../../services/peliculas/peliculas.service';
import { UserService } from '../../services/users/user.service';
import { Invitaciones, invitacionesRequest } from '../../models/invitaciones';

@Component({
  selector: 'app-nav-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './nav-home.component.html',
  styleUrl: './nav-home.component.css'
})
export class NavHomeComponent implements OnInit {

  @Input() user: User = new User();
  showMoviesDropdown: boolean = false;
  showGenerosDropdown: boolean = false;
  public generos: Genero[] = [];
  public invitaciones: invitacionesRequest = new invitacionesRequest();
  constructor(private authService: AuthService, private userService: UserService, private peliculasService: PeliculasService) { }

  ngOnInit(): void {
    this.peliculasService.getGeneros().subscribe((generos: Genero[]) => {
      this.generos = generos;
    });
    if (this.authService.isLoggedIn()) {
      this.userService.getInvitations().subscribe((invitaciones: invitacionesRequest) => {
        this.invitaciones = invitaciones;
        console.log(this.authService.getAuthToken());
      });
    }
  }
  aceptarInvitacion(invitacion: Invitaciones) {
    invitacion.aceptada = 1;
   this.userService.aceptInvitation(invitacion).subscribe((invitacion: Invitaciones) => {
      console.log(invitacion);
    })
  }
  rechazarInvitacion(invitacion: Invitaciones) {
    console.log("rechazar");
  }

  closeSesion() {
    this.authService.logout();
    this.authService.clearAuthToken();
    window.location.reload();
  }

  onMouseOverMovies(): void {
    if (window.innerWidth > 992) {
      this.showMoviesDropdown = true;
    }
  }

  onMouseOutMovies(): void {
    this.showMoviesDropdown = false;
  }

  onMouseOverGeneros(): void {
    if (window.innerWidth > 992) {
      this.showGenerosDropdown = true;
    }
  }

  onMouseOutGeneros(): void {
    this.showGenerosDropdown = false;
  }
}
