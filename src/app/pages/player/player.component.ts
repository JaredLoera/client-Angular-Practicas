import { Component, OnInit,ElementRef, ViewChild ,AfterViewInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

import { PeliculasService } from '../../services/peliculas/peliculas.service';
import { Pelicula } from '../../models/pelicula';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup,Validators ,FormBuilder} from '@angular/forms';
import { Sala } from '../../models/sala';
import { SalasService } from '../../services/salas/salas.service';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent implements OnInit, AfterViewInit{
  pelicula = new Pelicula();
  id = this.route.snapshot.params['id'];
  mouseTimer: any;
  formSubmittedErrors = false;
  salaFormNew: FormGroup;
  sala:Sala = new Sala();
  playing: boolean = false;
  muted: boolean = false;
  isFullscreen: boolean = false;
  ocultarMouse: boolean = false;
  watchedTime: string = '0%';
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  
  constructor(private salaService:SalasService,private peliculaService: PeliculasService, private route: ActivatedRoute, private http: HttpClient) 
  {
    this.salaFormNew = new FormBuilder().group({
      nombre: [this.sala.nombre, [Validators.required]]
    });
   }

  sumitFormSala(){
    if(this.salaFormNew.valid){
     this.sala = this.salaFormNew.value;
     this.sala.pelicula_id = this.id;
    this.salaService.saveSala(this.sala).subscribe((data) => {
      console.log(data);
    });
    }else{
      this.formSubmittedErrors = true;
    }
  }

  ngOnInit(): void {
    this.peliculaService.getPelicula(this.id).subscribe((pelicula: Pelicula) => {
      this.pelicula = pelicula;
      console.log(this.pelicula.video_url);
    });
  }
  ngAfterViewInit(): void {
    this.videoPlayer.nativeElement.addEventListener('timeupdate', () => {
      const watchedTime = (this.videoPlayer.nativeElement.currentTime / this.videoPlayer.nativeElement.duration) * 100;
      this.watchedTime = watchedTime + '%';
    });

    document.addEventListener('keyup', (event) => {
      if (event.code === 'Space') {
        this.playPause();
      }
      if (event.code === 'ArrowRight') {
        this.forward();
      }
      if (event.code === 'ArrowLeft') {
        this.back();
      }
      if (event.code === 'KeyF') {
        this.toggleFullscreen();
      }
      if (event.code === 'KeyM') {
        this.toggleMute();
      }
    });
    document.addEventListener('mousemove', () => {
      this.showControls(); 
    this.resetMouseTimer();
    });
    
  }
  resetMouseTimer(): void {
    clearTimeout(this.mouseTimer); 
    this.mouseTimer = setTimeout(() => {
      this.hideControls(); 
    }, 3300); 
  }

  hideControls(): void {
    const controlsBar = document.querySelector('.bottom__video-control') as HTMLElement;
    const buttonBack = document.querySelector('.top-left') as HTMLElement;
    const buttonInvit = document.querySelector('.top-right') as HTMLElement;
    controlsBar.style.opacity = "0";
    buttonBack.style.opacity = "0";
    buttonInvit.style.opacity = "0";
    this.ocultarMouse = true;
  }
  showControls(): void {
    const controlsBar = document.querySelector('.bottom__video-control') as HTMLElement;
    const buttonBack = document.querySelector('.top-left') as HTMLElement;
    const buttonInvit = document.querySelector('.top-right') as HTMLElement;
    controlsBar.style.opacity = "1";
    buttonBack.style.opacity = "1";
    buttonInvit.style.opacity = "1";
    this.ocultarMouse = false;
  }
  playPause(): void {
    if (this.videoPlayer.nativeElement.paused) {
      this.videoPlayer.nativeElement.play();
      this.playing = true;
    } else {
      this.videoPlayer.nativeElement.pause();
      this.playing = false;
    }
  }
  seek(event:any): void {
    const percent = (event.offsetX / event.target.clientWidth) * 100;
    this.videoPlayer.nativeElement.currentTime = (this.videoPlayer.nativeElement.duration * percent) / 100;
  }
  back(): void {
    this.videoPlayer.nativeElement.currentTime -= 10;
  }
  forward(): void {
    this.videoPlayer.nativeElement.currentTime += 10;
  }
  volumeUp(): void {}
  toggleMute(): void {
    this.videoPlayer.nativeElement.muted = !this.videoPlayer.nativeElement.muted;
    this.muted = !this.muted;
  }
  toggleFullscreen(): void {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      this.isFullscreen = false;  
    } else {
     document.documentElement.requestFullscreen();
      this.isFullscreen = true;
    }
  }
  
}
