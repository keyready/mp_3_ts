import { Profile } from 'entities/Profile';

export interface User {
    id: string;
    email: string;
    avatar?: string;
    role?: string;
}

export interface UserSchema {
    authData?: Profile;
    token?: string;

    _inited?: boolean;
}
