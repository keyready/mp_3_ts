import { User } from './User';

export interface UserSchema {
    data?: User;
    isLoading: boolean;
    error?: string;
    isInited?: boolean
}

export interface UsersSchema {
    data?: User[];
    isLoading: boolean;
    error?: string;
}
