export class Sala{
    id?: number;
    nombre?: string;
    status?: boolean;
    pelicula_id?: number;
    created_at?: string;
    updated_at?: string;
    user_id?: number;
}
import { User } from './user';
export class salaInvitado{
    id?: number;
    nombre?: string;
    status?: boolean;
    created_at?: string;
    updated_at?: string;
    user_id?: number;
    user: User = new User();
}
