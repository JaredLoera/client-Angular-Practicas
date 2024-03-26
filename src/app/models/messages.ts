import { User } from './user';
export class Message {
    id?: number;
    user_id?: number;
    sala_id?: number;
    message?: string;
    user: User = new User();
    created_at?: string;
    updated_at?: string;
}
