import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sala ,salaInvitado} from '../../models/sala';
import { AuthService } from '../auth/auth.service';
import { Message } from '../../models/messages';

@Injectable({
  providedIn: 'root'
})
export class SalasService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http:HttpClient,private authService:AuthService) { }

  getMisSalas():Observable<Sala[]>{
    return this.http.get<Sala[]>(`${this.baseUrl}/salas`,{headers: {Authorization: `Bearer ${this.authService.getAuthToken()}`}});
  }
  saveSala(sala:Sala):Observable<Sala>{
    return this.http.post<Sala>(`${this.baseUrl}/salas`, sala,{headers: {Authorization: `Bearer ${this.authService.getAuthToken()}`}});
  }
  salaInvitacion(sala_id:number,correo:string){
    return this.http.post(`${this.baseUrl}/salas/invitacion`,{sala_id,correo},{headers : {Authorization: `Bearer ${this.authService.getAuthToken()}`}});
  }
  getSalasInvitado(){
    return this.http.get<salaInvitado[]>(`${this.baseUrl}/salas/invitado`,{headers: {Authorization: `Bearer ${this.authService.getAuthToken()}`}});
  }
  getMessagesSala(sala_id:number):Observable<Message[]>{
    return this.http.get<Message[]>(`${this.baseUrl}/message/${sala_id}`,{headers: {Authorization: `Bearer ${this.authService.getAuthToken()}`}});
  }
}
