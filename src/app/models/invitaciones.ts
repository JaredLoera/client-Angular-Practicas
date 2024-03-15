import { User } from './user';
export class invitacionesRequest{
    numNotificaciones?: number;
    notificaciones?: Invitaciones[];
}
export class Invitaciones{
    id?: number;
    mensaje?: string;
    leida?: number;
    aceptada?: number;
    rechazada?: number;
    sala_id?: number;
    user_id?: number;
    quien_envia_id?: number;
    created_at?: string;
    updated_at?: string;
    quien_envia: User = new User();
}

