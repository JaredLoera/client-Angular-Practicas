import { Component, OnInit ,ViewChild,ElementRef,AfterViewChecked} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Validators ,FormBuilder} from '@angular/forms';
import { RouterModule,ActivatedRoute} from '@angular/router';
import { NavHomeComponent } from '../../components/nav-home/nav-home.component';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth/auth.service';
import { SalasService } from '../../services/salas/salas.service';
import { UserService } from '../../services/users/user.service';
import { Message } from '../../models/messages';
import { PeliculasService } from '../../services/peliculas/peliculas.service';
import { Pelicula } from '../../models/pelicula';
@Component({
  selector: 'app-sala',
  standalone: true,
  imports: [
    CommonModule,
    NavHomeComponent,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './sala.component.html',
  styleUrl: './sala.component.css'
})
export class SalaComponent implements OnInit , AfterViewChecked{
 user: User = new User();
 formSubmittedErrors = false;
 userFrom: FormGroup;
 mensaje: FormGroup;
 lastMessageFade: boolean = false;
 id = this.route.snapshot.params['id'];
 mouseTimer: any;
 chatTimer: any;
 messages: Message[] = [];
 pelicula : Pelicula = new Pelicula();
 playing: boolean = false;
 muted: boolean = false;
 isFullscreen: boolean = false;
 ocultarMouse: boolean = false;
 watchedTime: string = '0%';
 @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
 @ViewChild('chat') chat!: ElementRef<HTMLDivElement>; 
  constructor(private authService: AuthService,private route: ActivatedRoute,private salasService: SalasService,private userService: UserService,private peliculasService: PeliculasService) { 
    this.userFrom = new FormBuilder().group({
      email: [this.user.email, [Validators.required]],
    });
    this.mensaje = new FormBuilder().group({
      texto: ['', [Validators.required]],
    });
    
  }
  ngOnInit(): void {
    this.authService.profile().subscribe((user: User) => {
      this.user = user;
    });
    console.log(this.authService.getAuthToken());
    this.salasService.getMessagesSala(this.id).subscribe((data:Message[]) => {
      this.messages = data;
    });
    this.peliculasService.getPelicula(this.id).subscribe((pelicula:Pelicula) => {
      this.pelicula = pelicula;
      console.log(this.pelicula.video_url + "aqui esta el video")
    });
  }
  ngAfterViewChecked(): void {
   this.scrollchat()  
  }
  scrollchat(){
    this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight;
  }
  loadMessages(): void {
    this.salasService.getMessagesSala(this.id).subscribe((data: Message[]) => {
      this.messages = data;
    });
    
  }
  sendMessage(): void {
    if (this.mensaje.valid) {
      const messageText = this.mensaje.value['texto'];
      this.userService.sendMessages(this.id, messageText).subscribe((data) => {
        this.loadMessages()
        this.mensaje.reset()
        this.scrollchat()
      });
    }
  }
  submitForm() {
    if (this.userFrom.valid) {
      const email = this.userFrom.value['email'];
      this.salasService.salaInvitacion(this.id,email).subscribe((data) => {
        this.userFrom.reset();
      });
    }
    this.formSubmittedErrors = true;
  }
  ngAfterViewInit(): void {
    this.videoPlayer.nativeElement.addEventListener('timeupdate', () => {
      const watchedTime = (this.videoPlayer.nativeElement.currentTime / this.videoPlayer.nativeElement.duration) * 100;
      this.watchedTime = watchedTime + '%';
    });
    document.addEventListener('keyup', (event) => {
      if (event.code === 'ArrowRight') {
        this.forward();
      }
      if (event.code === 'ArrowLeft') {
        this.back();
      }
      if(event.code === 'Enter'){
        this.sendMessage();
      }
      if(event.code==="Space" && this.lastMessageFade === false){
        this.playPause();
      }
      if(event.code==="KeyM"){
        if(this.lastMessageFade === true){
          this.lastMessageFade = false;
          console.log("aqui se activa el fade")
          this.mensaje.reset();
        }
        else{
          this.lastMessageFade = true;
          console.log("aqui se desactiva el fade")
          this.mensaje.reset();
        }
      }
    });
    document.addEventListener('mousemove', () => {
      this.showControls(); 
    this.resetMouseTimer();
    });
    this.resetOpacityTimer();
  }
  resetOpacityTimer(): void {
    clearTimeout(this.chatTimer); 
    this.chatTimer = setTimeout(() => {
      this.lastMessageFade = true; 
    }, 1000);
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
