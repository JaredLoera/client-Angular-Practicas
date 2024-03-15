import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router} from '@angular/router';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { NavHomeComponent } from '../../components/nav-home/nav-home.component';
import { OffCanvasViewerComponent } from '../../components/off-canvas-viewer/off-canvas-viewer.component';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user';
import { Sala ,salaInvitado} from '../../models/sala';
import { SalasService } from '../../services/salas/salas.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NavHomeComponent,
    OffCanvasViewerComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  public user: User = new User();
  public sala: Sala = new Sala();
  public salas: Sala[] = [];
  public salasInvitado: salaInvitado[] = [];
  formSubmittedErrors = false;
  salaFrom: FormGroup;
  constructor(private authService: AuthService, private salasService: SalasService,private route: Router) {
    this.salaFrom = new FormBuilder().group({
      nombre: [this.sala.nombre, [Validators.required]],
    });
  }
  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.cargarPerfil();
      this.cargarSalas();
      this.cargarSalasInvitado();
    }else{
      this.route.navigate(['']);
    }
  }
  submitForm() {
    if (this.salaFrom.valid) {
      this.sala = this.salaFrom.value;
      this.salasService.saveSala(this.sala).subscribe(() => {
        this.salaFrom.reset();
        this.cargarSalas();
      });
    }
    this.formSubmittedErrors = true;
  }
  cargarPerfil() {
    this.authService.profile().subscribe((user: User) => {
      this.user = user;
    });
  
  }
  cargarSalasInvitado() {
    this.salasService.getSalasInvitado().subscribe((salas: salaInvitado[]) => {
      this.salasInvitado = salas;
    });
  }
  cargarSalas() {
    this.salasService.getMisSalas().subscribe((salas: Sala[]) => {
      this.salas = salas;
    });
  }
}
